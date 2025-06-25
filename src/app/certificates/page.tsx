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

  // console.log(certificateRef.current);

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

    // Wait for the certificate template to render
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Downloading certificate...");

    try {
      // console.log("Certificate ref:", certificateRef.current);

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

      // Create PDF
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

      // Show success message
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

    // Generate the certificate image first
    setSelectedCertificate(certificate);
    setShowCertificateTemplate(true);

    // Wait for the certificate template to render
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

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to generate certificate image");
        }

        // Create a temporary URL for the image
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
            // Use native sharing with the image file
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
            // Fallback: copy text and show instructions
            await navigator.clipboard.writeText(shareText);
            
            // Create a temporary download link for the image
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
          // Final fallback: just copy text and download image
          await navigator.clipboard.writeText(shareText);
          
          const downloadLink = document.createElement('a');
          downloadLink.href = imageUrl;
          downloadLink.download = `NestFT-${certificate.stage}-certificate.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          alert('Certificate text copied to clipboard and image downloaded! You can now share both on social media.');
        }
        
        // Clean up
        URL.revokeObjectURL(imageUrl);
      }, 'image/png', 0.95);

    } catch (error) {
      console.error("Error generating certificate for sharing:", error);
      
      // Fallback to text-only sharing
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
        {/* Header */}
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

        {/* Certificates Grid */}
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

        {/* Certificate Options */}
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

        {/* Hidden Certificate Template */}
        {/* Hidden Certificate Template */}
       {/* Hidden Certificate Template */}
<div className="fixed -top-[9999px] left-0 z-[-1]">
  {showCertificateTemplate && selectedCertificate && userProfile && (
    <div
      ref={certificateRef}
      className="w-[1200px] h-[850px] bg-white relative"
      style={{
        fontFamily: "serif",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative Border */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
          border: "3px solid #3b82f6",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      />
      
      {/* Inner Content Container */}
      <div style={{ position: "relative", padding: "60px", height: "100%" }}>
        
        {/* Header with Logo */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
            {/* Logo placeholder - you can replace with actual logo */}
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "32px",
                fontWeight: "bold",
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
              }}
            >
              N
            </div>
            <div>
              <h1
                style={{
                  fontSize: "42px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  margin: "0",
                  letterSpacing: "-1px",
                }}
              >
                NestFT.dev
              </h1>
              <p style={{ fontSize: "16px", color: "#64748b", margin: "5px 0 0 0" }}>
                Professional Development Platform
              </p>
            </div>
          </div>
          
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "15px",
              letterSpacing: "-0.5px",
            }}
          >
            Certificate of Completion
          </h2>
          
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #f59e0b, #d97706)",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>
        {/* Main Content */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <p style={{ fontSize: "22px", color: "#64748b", marginBottom: "25px", fontStyle: "italic" }}>
            This is to certify that
          </p>
          
          <div
            style={{
              background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
              padding: "20px 40px",
              borderRadius: "12px",
              marginBottom: "30px",
              border: "2px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#1e293b",
                margin: "0",
                letterSpacing: "-1px",
              }}
            >
              {userProfile?.full_name || "Developer Name"}
            </h3>
          </div>
          
          <p style={{ fontSize: "22px", color: "#64748b", marginBottom: "25px" }}>
            has successfully completed the
          </p>

          <div
            style={{
              display: "inline-block",
              padding: "20px 40px",
              background: selectedCertificate.stage === "beginner" 
                ? "linear-gradient(135deg, #10b981, #059669)" 
                : selectedCertificate.stage === "intermediate"
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "white",
                margin: "0",
                textTransform: "capitalize",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {selectedCertificate.stage} Developer Track
            </h4>
          </div>

          <p style={{ fontSize: "20px", color: "#64748b", marginBottom: "25px", lineHeight: "1.6" }}>
            demonstrating proficiency in modern web development technologies<br />
            and achieving <strong style={{ color: "#1e293b" }}>{selectedCertificate.percentage}%</strong> completion with excellence
          </p>
              fontWeight: "bold",

          {includeRanking && selectedCertificate.userRank && (
            <div
              style={{
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                border: "2px solid #f59e0b",
                borderRadius: "10px",
                padding: "15px 25px",
                display: "inline-block",
                marginBottom: "20px",
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
                🏆 Global Ranking: #{selectedCertificate.userRank} out of {selectedCertificate.totalUsers} developers
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
          {/* Date and Certificate ID */}
          <div>
            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 5px 0" }}>
                <strong>Issue Date:</strong>
              </p>
              <p style={{ fontSize: "18px", color: "#1e293b", margin: "0", fontWeight: "600" }}>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 5px 0" }}>
                <strong>Certificate ID:</strong>
              </p>
              <p style={{ fontSize: "14px", color: "#1e293b", margin: "0", fontFamily: "monospace" }}>
                NFTD-{selectedCertificate.stage.toUpperCase()}-{user?.id?.slice(0, 8) || "USER"}-{new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "2px solid #64748b",
                paddingTop: "10px",
                paddingLeft: "30px",
                paddingRight: "30px",
                marginBottom: "10px",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", margin: "0" }}>
                NestFT.dev Team
              </p>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "5px 0 0 0" }}>
                Authorized Signature
              </p>
            </div>
          </div>
        {/* Achievement Stats */}
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

          {/* Official Seal */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "90px",
                height: "90px",
                border: "3px solid #3b82f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                marginBottom: "8px",
              }}
            >
              <Award style={{ width: "45px", height: "45px", color: "#3b82f6" }} />
            </div>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "0" }}>
              Official Seal
            </p>
          </div>
        </div>
        
        {/* Verification URL */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0" }}>
            Verify this certificate at: nestft.dev/verify/{user?.id?.slice(0, 8) || "USER"}-{selectedCertificate.stage}
          </p>
        </div>
      </div>
    </div>
  )}
</div>