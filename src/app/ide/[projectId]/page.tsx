"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Square,
  Save,
  Download,
  RefreshCw,
  Settings,
  Terminal as TerminalIcon,
  Eye,
  GitBranch,
  Send,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  PanelBottomClose,
  PanelBottomOpen,
  Maximize2,
  Minimize2,
} from "lucide-react";
// import { CodeEditor } from "@/components/ide/CodeEditor";
// import { Terminal } from "@/components/ide/Terminal";
// import { PreviewPanel } from "@/components/ide/PreviewPanel";
// import { GitHubIntegration } from "@/components/ide/GitHubIntegration";
// import { FileExplorer } from "@/components/ide/FileExplorer";

const CodeEditor = dynamic(
  () => import("@/components/ide/CodeEditor").then((mod) => mod.CodeEditor),
  { ssr: false }
);
const Terminal = dynamic(
  () => import("@/components/ide/Terminal").then((mod) => mod.Terminal),
  { ssr: false }
);
const PreviewPanel = dynamic(
  () => import("@/components/ide/PreviewPanel").then((mod) => mod.PreviewPanel),
  { ssr: false }
);
const GitHubIntegration = dynamic(
  () =>
    import("@/components/ide/GitHubIntegration").then(
      (mod) => mod.GitHubIntegration
    ),
  { ssr: false }
);
const FileExplorer = dynamic(
  () => import("@/components/ide/FileExplorer").then((mod) => mod.FileExplorer),
  { ssr: false }
);

//
import { FileNode } from "@/types/ide";
import { saveProjectCode, updateUserProject } from "@/lib/database";
import { UserProject } from "@/lib/database";
import { getFileContent } from "@/lib/fileTemplates";
import { techStacks } from "@/data/projects";
import { useAuthStore } from "@/lib/store";
import { useToast, toast } from "@/components/ui/toast";
import JSZip from "jszip";
import { TechTemplate } from "@/types/project";

export default function IDEPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const projectId = params.projectId as string;
  const userProjectId = searchParams.get("project_id") as string;

  const [userProject, setUserProject] = useState<UserProject | null>(null);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activePanel, setActivePanel] = useState<
    "terminal" | "preview" | "github"
  >("preview");
  // const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bottomPanelCollapsed, setBottomPanelCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarWidth] = useState(280);
  const [bottomPanelHeight] = useState(300);

  // Language preference
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "typescript"
  >("javascript");
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  // Your other imports and state setup...

  const loadProject = useCallback(async () => {
    try {
      const templateId = searchParams.get("template");
      const projectName = searchParams.get("name");
      const language =
        (searchParams.get("language") as "javascript" | "typescript") ||
        "javascript";

      if (!templateId || !projectName) return;

      setSelectedLanguage(language);

      const allTemplates = techStacks.flatMap((stack) => stack.templates);
      const template = allTemplates.find((t) => t.id === templateId);

      if (!template) return;

      const initialTree = initializeFileTree(
        template.folderStructure,
        "",
        template,
        projectName
      );
      setFileTree(initialTree);

      const firstFile = findFirstFile(initialTree);
      if (firstFile) {
        setSelectedFile(firstFile);
        setCode(firstFile.content || "");
      }

      setUserProject({
        id: projectId,
        user_id: user?.id || "user-id",
        project_id: userProjectId,
        project_name: projectName,
        stack: "frontend",
        difficulty: "beginner",
        template_id: templateId,
        status: "in_progress",
        code_files: {},
        started_at: new Date().toISOString(),
        last_saved_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error loading project:", error);
    }
  }, [searchParams, projectId, user?.id, userProjectId]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const initializeFileTree = (
    structure: object,
    basePath = "",
    template: TechTemplate,
    projectName: string
  ): FileNode[] => {
    return Object.entries(structure).map(([name, content]) => {
      const path = basePath ? `${basePath}/${name}` : name;

      if (typeof content === "string") {
        return {
          name,
          type: "file",
          content: getFileContent(path, template, projectName),
          path,
        };
      } else {
        return {
          name,
          type: "folder",
          children: initializeFileTree(content, path, template, projectName),
          path,
          isOpen: true,
        };
      }
    });
  };

  const findFirstFile = (nodes: FileNode[]): FileNode | null => {
    for (const node of nodes) {
      if (node.type === "file") {
        return node;
      }
      if (node.children) {
        const found = findFirstFile(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFileContent = (path: string, content: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.path === path && node.type === "file") {
          return { ...node, content };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setFileTree(updateNode(fileTree));
  };

  const handleFileSelect = (file: FileNode) => {
    if (selectedFile && selectedFile.path !== file.path) {
      // Save current file content
      updateFileContent(selectedFile.path, code);
    }

    setSelectedFile(file);
    setCode(file.content || "");
  };

  const handleCreateFile = (parentPath: string, fileName: string) => {
    const newFile: FileNode = {
      name: fileName,
      type: "file",
      content: "",
      path: parentPath ? `${parentPath}/${fileName}` : fileName,
    };

    const addFileToTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.path === parentPath && node.type === "folder") {
          return {
            ...node,
            children: [...(node.children || []), newFile],
            isOpen: true,
          };
        }
        if (node.children) {
          return { ...node, children: addFileToTree(node.children) };
        }
        return node;
      });
    };

    if (parentPath === "") {
      setFileTree([...fileTree, newFile]);
    } else {
      setFileTree(addFileToTree(fileTree));
    }
  };

  const handleCreateFolder = (parentPath: string, folderName: string) => {
    const newFolder: FileNode = {
      name: folderName,
      type: "folder",
      children: [],
      path: parentPath ? `${parentPath}/${folderName}` : folderName,
      isOpen: true,
    };

    const addFolderToTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.path === parentPath && node.type === "folder") {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
            isOpen: true,
          };
        }
        if (node.children) {
          return { ...node, children: addFolderToTree(node.children) };
        }
        return node;
      });
    };

    if (parentPath === "") {
      setFileTree([...fileTree, newFolder]);
    } else {
      setFileTree(addFolderToTree(fileTree));
    }
  };

  const handleDeleteNode = (path: string) => {
    const deleteFromTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter((node) => {
        if (node.path === path) {
          return false;
        }
        if (node.children) {
          node.children = deleteFromTree(node.children);
        }
        return true;
      });
    };

    setFileTree(deleteFromTree(fileTree));

    // If deleted file was selected, clear selection
    if (selectedFile?.path === path) {
      setSelectedFile(null);
      setCode("");
    }
  };

  const handleSave = useCallback(
    async (showFeedback = true) => {
      if (!selectedFile || !userProject) return;

      setIsSaving(true);

      try {
        updateFileContent(selectedFile.path, code);
        const allFiles = collectAllFiles(fileTree);
        await saveProjectCode(userProject.id, allFiles);

        setLastSaved(new Date());

        if (showFeedback) {
          addToast(toast.success("Project saved successfully!", "Saved"));
        }
      } catch (error) {
        console.error("Error saving project:", error);
        addToast(
          toast.error(
            "Failed to save project. Please try again.",
            "Save Failed"
          )
        );
        addToast(
          toast.error(
            "Failed to create project. Please try again.",
            "Project Creation Failed"
          )
        );
      } finally {
        setIsSaving(false);
      }
    },
    [selectedFile, userProject, code, fileTree, addToast]
  );

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (selectedFile && code !== selectedFile.content) {
        handleSave(false);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [selectedFile, code, handleSave]);

  const handleSubmit = async () => {
    if (!userProject || !user) return;

    setIsSubmitting(true);

    try {
      // Save current work first
      await handleSave(false);

      // Collect all files for submission
      const allFiles = collectAllFiles(fileTree);

      // Update project status to submitted
      await updateUserProject(userProject.id, {
        status: "submitted",
        code_files: allFiles,
      });

      // Navigate to submission page for AI grading
      router.push(
        `/projects/${userProject.project_id}/submit?userProjectId=${userProject.id}`
      );
    } catch (error) {
      console.error("Error submitting project:", error);
      addToast(
        toast.error(
          "Failed to submit project. Please try again.",
          "Submission Failed"
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const collectAllFiles = (
    nodes: FileNode[],
    files: Record<string, string> = {}
  ): Record<string, string> => {
    nodes.forEach((node) => {
      if (node.type === "file") {
        files[node.path] = node.content || "";
      } else if (node.children) {
        collectAllFiles(node.children, files);
      }
    });
    return files;
  };

  const handleRun = () => {
    setIsRunning(true);
    // The preview panel will handle the actual preview generation
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleDownload = () => {
    const allFiles = collectAllFiles(fileTree);
    const zip = new JSZip();

    Object.entries(allFiles).forEach(([path, content]) => {
      zip.file(path, content);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${userProject?.project_name || "project"}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast(
        toast.success("Project downloaded successfully!", "Download Complete")
      );
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!userProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading IDE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">
            {userProject.project_name}
          </h1>
          <Badge variant="outline" className="text-xs">
            {userProject.template_id}
          </Badge>
          <Badge className="bg-green-500/10 text-green-700 text-xs">
            {userProject.difficulty}
          </Badge>
          {lastSaved && (
            <span className="text-xs text-gray-500">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setBottomPanelCollapsed(!bottomPanelCollapsed)}
          >
            {bottomPanelCollapsed ? (
              <PanelBottomOpen className="h-4 w-4" />
            ) : (
              <PanelBottomClose className="h-4 w-4" />
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>

          {isRunning ? (
            <Button variant="outline" size="sm" onClick={handleStop}>
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleRun}>
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          )}

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-1" />
                Submit for Grading
              </>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        {!sidebarCollapsed && (
          <div
            className="bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0"
            style={{ width: `${sidebarWidth}px` }}
          >
            <FileExplorer
              fileTree={fileTree}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onCreateFile={handleCreateFile}
              onCreateFolder={handleCreateFolder}
              onDeleteNode={handleDeleteNode}
              onToggleFolder={(path) => {
                const toggleInTree = (nodes: FileNode[]): FileNode[] => {
                  return nodes.map((node) => {
                    if (node.path === path && node.type === "folder") {
                      return { ...node, isOpen: !node.isOpen };
                    }
                    if (node.children) {
                      return { ...node, children: toggleInTree(node.children) };
                    }
                    return node;
                  });
                };
                setFileTree(toggleInTree(fileTree));
              }}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor and Preview */}
          <div
            className="flex-1 flex overflow-hidden"
            style={{
              height: bottomPanelCollapsed
                ? "100%"
                : `calc(100% - ${bottomPanelHeight}px)`,
            }}
          >
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Editor</span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs">
                      <input
                        type="radio"
                        name="language"
                        checked={selectedLanguage === "javascript"}
                        onChange={() => setSelectedLanguage("javascript")}
                        className="mr-1"
                      />
                      JavaScript
                    </label>
                    <label className="text-xs">
                      <input
                        type="radio"
                        name="language"
                        checked={selectedLanguage === "typescript"}
                        onChange={() => setSelectedLanguage("typescript")}
                        className="mr-1"
                      />
                      TypeScript
                    </label>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const previewUrl = collectAllFiles(fileTree);
                    const blob = new Blob([previewUrl["index.html"] || ""], {
                      type: "text/html",
                    });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in New Tab
                </Button>
              </div>
              <CodeEditor
                file={selectedFile}
                code={code}
                onChange={setCode}
                onSave={() => handleSave(true)}
                selectedLanguage={selectedLanguage}
              />
            </div>

            {/* Right Panel - Preview */}
            <div className="w-1/2 border-l border-gray-200 flex flex-col">
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
                <span className="text-sm font-medium">Preview</span>
              </div>
              <PreviewPanel
                projectId={projectId}
                files={collectAllFiles(fileTree)}
                isRunning={isRunning}
                template={userProject?.template_id}
                onConsoleOutput={(output) =>
                  setConsoleMessages((prev) => [...prev, output])
                }
              />
            </div>
          </div>

          {/* Bottom Panel */}
          {!bottomPanelCollapsed && (
            <div
              className="border-t border-gray-200 flex flex-col"
              style={{ height: `${bottomPanelHeight}px` }}
            >
              <Tabs
                value={activePanel}
                onValueChange={(value) =>
                  setActivePanel(value as "terminal" | "preview" | "github")
                }
                className="flex-1 flex flex-col"
              >
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger
                    value="terminal"
                    className="flex items-center gap-2"
                  >
                    <TerminalIcon className="h-4 w-4" />
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Console
                  </TabsTrigger>
                  <TabsTrigger
                    value="github"
                    className="flex items-center gap-2"
                  >
                    <GitBranch className="h-4 w-4" />
                    GitHub
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="terminal"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <Terminal
                    projectId={projectId}
                    fileTree={fileTree}
                    onFileTreeUpdate={setFileTree}
                    onFileSelect={handleFileSelect}
                  />
                </TabsContent>

                <TabsContent
                  value="preview"
                  className="flex-1 m-0 overflow-hidden p-4"
                >
                  <div className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto whitespace-pre-wrap">
                    <div className="text-blue-400 mb-2">Console Output:</div>
                    {consoleMessages.length > 0 ? (
                      consoleMessages.map((output, index) => (
                        <div key={index} className="mb-1">
                          {output}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">
                        Ready to run your code... Try console.log(&#39;Hello
                        World!&#39;);
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="github"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <div className="p-4 h-full overflow-y-auto">
                    <GitHubIntegration
                      projectId={projectId}
                      projectName={userProject.project_name}
                      files={collectAllFiles(fileTree)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
