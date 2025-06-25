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
      className="w-[1200px] h-[850px] bg-white p-20 relative"
      style={{
        fontFamily: "serif",
        border: "8px solid #1e3a8a", // Deep Blue Border
        boxSizing: "border-box",
        backgroundImage: "url('https://i.imgur.com/UQF5V4U.png')", // Optional subtle background texture
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          Certificate of Achievement
        </h1>
        <div
          style={{
            width: "200px",
            height: "4px",
            backgroundColor: "#d4af37", // Gold
            margin: "0 auto",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p style={{ fontSize: "20px", color: "#4b5563", marginBottom: "30px" }}>
          This certifies that
        </p>
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "30px",
          }}
        >
          {userProfile?.full_name || "Developer Name"}
        </h2>
        <p style={{ fontSize: "20px", color: "#4b5563", marginBottom: "20px" }}>
          has successfully completed the
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "12px 24px",
            border: "2px solid #d4af37",
            borderRadius: "8px",
            backgroundColor: "#fefce8",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textTransform: "capitalize",
              color: "#1e3a8a",
            }}
          >
            {selectedCertificate.stage} Developer Program
          </h3>
        </div>

        <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "20px" }}>
          demonstrating excellence in web development and achieving{" "}
          <strong>{selectedCertificate.percentage}%</strong> completion
        </p>

        {includeRanking && selectedCertificate.userRank && (
          <p
            style={{
              fontSize: "18px",
              color: "#854d0e",
              backgroundColor: "#fefce8",
              padding: "10px 20px",
              borderRadius: "6px",
              display: "inline-block",
              marginBottom: "20px",
            }}
          >
            🏆 Ranked #{selectedCertificate.userRank} out of{" "}
            {selectedCertificate.totalUsers} developers
          </p>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "60px" }}>
        <div>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
            Issued on:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Certificate ID: NFTD-{selectedCertificate.stage.toUpperCase()}
            -{user?.id?.slice(0, 8) || "USER"}-{new Date().getFullYear()}
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ borderTop: "2px solid #9ca3af", paddingTop: "8px" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
              NestFT.dev
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Authorized Signature
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "3px solid #d4af37",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <Award style={{ width: "40px", height: "40px", color: "#d4af37" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>Official Seal</p>
        </div>
      </div>
    </div>
  )}
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
