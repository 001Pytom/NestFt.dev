"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  Award,
  Trophy,
  Star,
  CheckCircle,
  Lock,
  Calendar,
  MapPin,
} from "lucide-react";
import {
  calculateUserProgress,
  getUserProfile,
  getUserLeaderboardPosition,
  UserProfile,
} from "@/lib/database";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateData {
  stage: "beginner" | "intermediate" | "advanced";
  completionDate: string;
  percentage: number;
  isEligible: boolean;
  userRank?: number;
  totalUsers?: number;
}

export default function CertificatesPage() {
  const { user } = useAuthStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateData | null>(null);
  const [includeRanking, setIncludeRanking] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCertificateTemplate, setShowCertificateTemplate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadCertificateData();
    } 
  }, [user]);

  const loadCertificateData = async () => {
    if (!user) return;

    try {
      const [profile, progress, leaderboardPosition] = await Promise.all([
        getUserProfile(user.id),
        calculateUserProgress(user.id),
        getUserLeaderboardPosition(user.id),
      ]);

      setUserProfile(profile);

      const certificateData: CertificateData[] = [
        {
          stage: "beginner",
          completionDate: new Date().toISOString(),
          percentage: progress.beginner.percentage,
          isEligible: progress.beginner.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers,
        },
        {
          stage: "intermediate",
          completionDate: new Date().toISOString(),
          percentage: progress.intermediate.percentage,
          isEligible: progress.intermediate.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers,
        },
        {
          stage: "advanced",
          completionDate: new Date().toISOString(),
          percentage: progress.advanced.percentage,
          isEligible: progress.advanced.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers,
        },
      ];

      setCertificates(certificateData);
    } catch (error) {
      console.error("Error loading certificate data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "beginner":
        return "from-green-400 to-green-600";
      case "intermediate":
        return "from-yellow-400 to-yellow-600";
      case "advanced":
        return "from-red-400 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "beginner":
        return <Star className="h-8 w-8" />;
      case "intermediate":
        return <Trophy className="h-8 w-8" />;
      case "advanced":
        return <Award className="h-8 w-8" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };

  const downloadCertificate = async (certificate: CertificateData) => {
    if (!userProfile) {
      alert("User profile not loaded. Please try again.");
      return;
    }

    setIsGenerating(true);
    setSelectedCertificate(certificate);
    setShowCertificateTemplate(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Downloading certificate...");

    try {
      if (!certificateRef.current) {
        throw new Error("Certificate template not rendered. Please try again.");
      }

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: 800,
        scrollX: 0,
        scrollY: 0,
      });

      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 297;
      const imgHeight = 210;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(
        `NestFT-${
          certificate.stage
        }-certificate-${userProfile?.full_name?.replace(/\s+/g, "-")}.pdf`
      );

      alert("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
      setSelectedCertificate(null);
      setShowCertificateTemplate(false);
    }
  };

  const shareCertificate = async (certificate: CertificateData) => {
    if (!userProfile) {
      alert("User profile not loaded. Please try again.");
      return;
    }

    setSelectedCertificate(certificate);
    setShowCertificateTemplate(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      if (!certificateRef.current) {
        throw new Error("Certificate template not rendered. Please try again.");
      }

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: 800,
        scrollX: 0,
        scrollY: 0,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to generate certificate image");
        }

        const imageUrl = URL.createObjectURL(blob);
        
        const shareText = `🎉 I just earned my ${
          certificate.stage.charAt(0).toUpperCase() + certificate.stage.slice(1)
        } Developer Certificate from NestFT.dev! 
        
${
  includeRanking && certificate.userRank
    ? `🏆 Currently ranked #${certificate.userRank} out of ${certificate.totalUsers} developers!`
    : ""
}

Join me in building real projects and advancing your tech career! 💻

#WebDevelopment #Coding #TechCareer #NestFTdev`;

        try {
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'certificate.png', { type: 'image/png' })] })) {
            const file = new File([blob], `NestFT-${certificate.stage}-certificate.png`, { type: 'image/png' });
            await navigator.share({
              title: `${
                certificate.stage.charAt(0).toUpperCase() +
                certificate.stage.slice(1)
              } Developer Certificate`,
              text: shareText,
              files: [file]
            });
          } else {
            await navigator.clipboard.writeText(shareText);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = imageUrl;
            downloadLink.download = `NestFT-${certificate.stage}-certificate.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            alert('Certificate text copied to clipboard and image downloaded! You can now share both on social media.');
          }
        } catch (shareError) {
          console.log("Error sharing:", shareError);
          await navigator.clipboard.writeText(shareText);
          
          const downloadLink = document.createElement('a');
          downloadLink.href = imageUrl;
          downloadLink.download = `NestFT-${certificate.stage}-certificate.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          alert('Certificate text copied to clipboard and image downloaded! You can now share both on social media.');
        }
        
        URL.revokeObjectURL(imageUrl);
      }, 'image/png', 0.95);

    } catch (error) {
      console.error("Error generating certificate for sharing:", error);
      
      const shareText = `🎉 I just earned my ${
        certificate.stage.charAt(0).toUpperCase() + certificate.stage.slice(1)
      } Developer Certificate from NestFT.dev! 
      
${
  includeRanking && certificate.userRank
    ? `🏆 Currently ranked #${certificate.userRank} out of ${certificate.totalUsers} developers!`
    : ""
}

Join me in building real projects and advancing your tech career! 💻

#WebDevelopment #Coding #TechCareer #NestFTdev

${window.location.origin}`;

      try {
        if (navigator.share) {
          await navigator.share({
            title: `${
              certificate.stage.charAt(0).toUpperCase() +
              certificate.stage.slice(1)
            } Developer Certificate`,
            text: shareText,
            url: window.location.origin,
          });
        }
      } catch (shareError) { 
        console.log("Error sharing:", shareError);
        await navigator.clipboard.writeText(shareText);
        alert("Certificate details copied to clipboard!");
      }
    } finally {
      setShowCertificateTemplate(false);
      setSelectedCertificate(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🏆 Your Certificates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrate your achievements! Download and share your completion
              certificates for each development stage.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card
                className={`relative overflow-hidden ${
                  certificate.isEligible ? "ring-2 ring-primary" : "opacity-75"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getStageColor(
                    certificate.stage
                  )} opacity-10 pointer-events-none`}
                />

                <CardHeader className="text-center relative z-10">
                  <div
                    className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-br ${getStageColor(
                      certificate.stage
                    )} text-white`}
                  >
                    {getStageIcon(certificate.stage)}
                  </div>
                  <CardTitle className="capitalize text-xl">
                    {certificate.stage} Developer
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Progress: {certificate.percentage}%
                  </div>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${getStageColor(
                        certificate.stage
                      )} transition-all duration-300`}
                      style={{
                        width: `${Math.min(certificate.percentage, 100)}%`,
                      }}
                    />
                  </div>

                  {certificate.isEligible ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Certificate Available!
                        </span>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={() => downloadCertificate(certificate)}
                          disabled={isGenerating}
                          className="w-full"
                          type="button"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {isGenerating
                            ? "Generating..."
                            : "Download Certificate"}
                        </Button>

                        <Button
                          onClick={() => shareCertificate(certificate)}
                          variant="outline"
                          className="w-full"
                          type="button"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Achievement
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                        <span>Complete 70% to unlock</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.ceil(((70 - certificate.percentage) * 20) / 100)}{" "}
                        more projects needed
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Certificate Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="includeRanking"
                  checked={includeRanking}
                  onChange={(e) => setIncludeRanking(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="includeRanking" className="text-sm font-medium">
                  Include my leaderboard ranking on certificate
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Show your competitive ranking among all developers on the
                platform
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="fixed -top-[9999px] left-0 z-[-1]">
          {showCertificateTemplate && selectedCertificate && userProfile && (
            <div
              ref={certificateRef}
              className="w-[1200px] h-[850px] bg-white relative"
              style={{
                fontFamily: "serif",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                boxSizing: "border-box",
                padding: "60px",
                border: "8px solid #1e40af",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Decorative Border Pattern */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  right: "20px",
                  bottom: "20px",
                  border: "3px solid #3b82f6",
                  borderRadius: "15px",
                  background: "linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
                }}
              />
              
              {/* Header Section with Logo */}
              <div style={{ textAlign: "center", marginBottom: "40px", position: "relative", zIndex: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "36px", fontWeight: "bold" }}>N</span>
                  </div>
                  <div>
                    <h1
                      style={{
                        fontSize: "42px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        margin: "0",
                        letterSpacing: "2px",
                      }}
                    >
                      NestFT.dev
                    </h1>
                    <p style={{ fontSize: "16px", color: "#64748b", margin: "5px 0 0 0" }}>
                      Professional Development Platform
                    </p>
                  </div>
                </div>
                
                <div
                  style={{
                    width: "200px",
                    height: "4px",
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)",
                    margin: "0 auto",
                    borderRadius: "2px",
                  }}
                />
              </div>

              {/* Certificate Title */}
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: "0 0 10px 0",
                    letterSpacing: "1px",
                  }}
                >
                  CERTIFICATE OF COMPLETION
                </h2>
                <p style={{ fontSize: "18px", color: "#64748b", margin: "0" }}>
                  This certifies that
                </p>
              </div>

              {/* User Name Section */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                    border: "2px solid #cbd5e1",
                    borderRadius: "15px",
                    padding: "25px 40px",
                    display: "inline-block",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: "#1e293b",
                      margin: "0",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {userProfile?.full_name || "Developer"}
                  </h3>
                </div>
              </div>

              {/* Achievement Details */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <p style={{ fontSize: "20px", color: "#475569", marginBottom: "20px" }}>
                  has successfully completed the
                </p>
                
                <div
                  style={{
                    display: "inline-block",
                    padding: "20px 40px",
                    borderRadius: "12px",
                    background: selectedCertificate.stage === "beginner"
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : selectedCertificate.stage === "intermediate"
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "white",
                    marginBottom: "25px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      margin: "0",
                      letterSpacing: "1px",
                    }}
                  >
                    {selectedCertificate.stage} Developer Track
                  </h4>
                </div>
                
                <p style={{ fontSize: "18px", color: "#475569", marginBottom: "20px" }}>
                  demonstrating proficiency in web development technologies and completing{" "}
                  <strong>{selectedCertificate.percentage}%</strong> of required projects
                </p>

                {includeRanking && selectedCertificate.userRank && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                      border: "2px solid #f59e0b",
                      borderRadius: "10px",
                      padding: "15px 25px",
                      display: "inline-block",
                      marginTop: "15px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#92400e",
                        margin: "0",
                      }}
                    >
                      🏆 Global Ranking: #{selectedCertificate.userRank} out of{" "}
                      {selectedCertificate.totalUsers} developers
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: "60px",
                  position: "relative",
                }}
              >
                {/* Date and Location */}
                <div>
                  <div style={{ marginBottom: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          background: "#64748b",
                          borderRadius: "2px",
                        }}
                      />
                      <span style={{ fontSize: "14px", color: "#475569" }}>
                        Issued: {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          background: "#64748b",
                          borderRadius: "2px",
                        }}
                      />
                      <span style={{ fontSize: "14px", color: "#475569" }}>
                        Platform: NestFT.dev
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderTop: "2px solid #94a3b8",
                      paddingTop: "10px",
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      marginTop: "20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1e293b",
                        margin: "0 0 5px 0",
                      }}
                    >
                      NestFT.dev Team
                    </p>
                    <p style={{ fontSize: "14px", color: "#64748b", margin: "0" }}>
                      Authorized Signature
                    </p>
                  </div>
                </div>

                {/* Official Seal */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "4px solid #3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "#3b82f6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "white", fontSize: "24px" }}>🏆</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0" }}>
                    Official Seal
                  </p>
                </div>
              </div>

              {/* Certificate ID and Verification */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 5px 0" }}>
                  Certificate ID: NFTD-{selectedCertificate.stage.toUpperCase()}-
                  {user?.id?.slice(0, 8) || "USER"}-{new Date().getFullYear()}
                </p>
                <p style={{ fontSize: "11px", color: "#cbd5e1", margin: "0" }}>
                  Verify at: nestft.dev/verify
                </p>
              </div>

              {/* Decorative Elements */}
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                  borderRadius: "50%",
                  opacity: "0.1",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "60px",
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(45deg, #10b981, #059669)",
                  borderRadius: "50%",
                  opacity: "0.1",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "80px",
                  width: "50px",
                  height: "50px",
                  background: "linear-gradient(45deg, #f59e0b, #d97706)",
                  borderRadius: "50%",
                  opacity: "0.1",
                }}
              />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Achievement Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {certificates.filter((c) => c.isEligible).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Certificates Earned
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">
                    {userProfile?.total_points || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Points
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">
                    {userProfile?.current_stage?.charAt(0).toUpperCase() +
                      userProfile?.current_stage?.slice(1) || "Beginner"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current Level
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">
                    {userProfile?.streak_days || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Day Streak
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}