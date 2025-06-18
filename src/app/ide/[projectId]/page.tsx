"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Square,
  FolderPlus,
  FilePlus,
  Save,
  Download,
  RefreshCw,
  Settings,
  Terminal as TerminalIcon,
  Eye,
  Code,
  GitBranch,
  Send,
  CheckCircle,
} from "lucide-react";
import { CodeEditor } from "@/components/ide/CodeEditor";
import { Terminal } from "@/components/ide/Terminal";
import { PreviewPanel } from "@/components/ide/PreviewPanel";
import { GitHubIntegration } from "@/components/ide/GitHubIntegration";
import { FileNode } from "@/types/ide";
import { saveProjectCode, updateUserProject } from "@/lib/database";
import { UserProject } from "@/lib/database";
import { getFileContent } from "@/lib/fileTemplates";
import { techStacks } from "@/data/projects";
import { useAuthStore } from "@/lib/store";

export default function IDEPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
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
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(300);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (selectedFile && code !== selectedFile.content) {
        handleSave(false); // Silent save
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [selectedFile, code]);

  const loadProject = async () => {
    try {
      const templateId = searchParams.get("template");
      const projectName = searchParams.get("name");

      if (!templateId || !projectName) return;

      // Find template
      const allTemplates = techStacks.flatMap((stack) => stack.templates);
      const template = allTemplates.find((t) => t.id === templateId);

      if (!template) return;

      // Initialize file tree from template
      const initialTree = initializeFileTree(
        template.folderStructure,
        "",
        template,
        projectName
      );
      setFileTree(initialTree);

      // Select first file
      const firstFile = findFirstFile(initialTree);
      if (firstFile) {
        setSelectedFile(firstFile);
        setCode(firstFile.content || "");
      }

      // Create mock user project
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
  };

  const initializeFileTree = (
    structure: any,
    basePath = "",
    template: any,
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

  const handleSave = async (showFeedback = true) => {
    if (!selectedFile || !userProject) return;

    setIsSaving(true);

    try {
      // Update file content in tree
      updateFileContent(selectedFile.path, code);

      // Collect all file contents
      const allFiles = collectAllFiles(fileTree);

      // Save to database
      await saveProjectCode(userProject.id, allFiles);

      setLastSaved(new Date());

      if (showFeedback) {
        // Show save notification
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    // console.log("submitting");

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

      // console.log(projectId,userProjectId);

      // Navigate to submission page for AI grading
      router.push(
        `/projects/${userProject.project_id}/submit?userProjectId=${userProject.id}`
      );
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project. Please try again.");
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

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-100 ${
            selectedFile?.path === node.path ? "bg-blue-100 text-blue-700" : ""
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => {
            if (node.type === "file") {
              handleFileSelect(node);
            } else {
              // Toggle folder
              const updateTree = (nodes: FileNode[]): FileNode[] => {
                return nodes.map((n) =>
                  n.path === node.path
                    ? { ...n, isOpen: !n.isOpen }
                    : n.children
                    ? { ...n, children: updateTree(n.children) }
                    : n
                );
              };
              setFileTree(updateTree(fileTree));
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              <span className="text-gray-500">{node.isOpen ? "📂" : "📁"}</span>
              <span className="text-sm font-medium">{node.name}</span>
            </>
          ) : (
            <>
              <span className="text-gray-500">📄</span>
              <span className="text-sm">{node.name}</span>
              {selectedFile?.path === node.path && code !== node.content && (
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-auto"></div>
              )}
            </>
          )}
        </div>
        {node.type === "folder" &&
          node.isOpen &&
          node.children &&
          renderFileTree(node.children, level + 1)}
      </div>
    ));
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
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
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Save"}
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
                Submit for Gradingg
              </>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main IDE Layout - Fixed height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <div
          className="bg-gray-50 border-r border-gray-200 flex flex-col"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-gray-700">Explorer</h3>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <FolderPlus className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <FilePlus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor and Preview */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <CodeEditor
                file={selectedFile}
                code={code}
                onChange={setCode}
                onSave={() => handleSave(true)}
              />
            </div>

            {/* Right Panel */}
            <div className="w-1/2 border-l border-gray-200 flex flex-col">
              <Tabs
                value={activePanel}
                onValueChange={(value) => setActivePanel(value as any)}
              >
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="terminal"
                    className="flex items-center gap-2"
                  >
                    <TerminalIcon className="h-4 w-4" />
                    Terminal
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
                  value="preview"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <PreviewPanel
                    projectId={projectId}
                    files={collectAllFiles(fileTree)}
                    isRunning={isRunning}
                  />
                </TabsContent>

                <TabsContent
                  value="terminal"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <Terminal projectId={projectId} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
