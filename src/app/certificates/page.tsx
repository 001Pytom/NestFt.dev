'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Share2, Award, Trophy, Star, CheckCircle, Lock, Calendar, MapPin } from 'lucide-react'
import { calculateUserProgress, getUserProfile, getUserLeaderboardPosition, UserProfile } from '@/lib/database'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface CertificateData {
  stage: 'beginner' | 'intermediate' | 'advanced'
  completionDate: string
  percentage: number
  isEligible: boolean
  userRank?: number
  totalUsers?: number
}

export default function CertificatesPage() {
  const { user } = useAuthStore()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [certificates, setCertificates] = useState<CertificateData[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null)
  const [includeRanking, setIncludeRanking] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      loadCertificateData()
    }
  }, [user])

  const loadCertificateData = async () => {
    if (!user) return

    try {
      const [profile, progress, leaderboardPosition] = await Promise.all([
        getUserProfile(user.id),
        calculateUserProgress(user.id),
        getUserLeaderboardPosition(user.id)
      ])

      setUserProfile(profile)

      const certificateData: CertificateData[] = [
        {
          stage: 'beginner',
          completionDate: new Date().toISOString(),
          percentage: progress.beginner.percentage,
          isEligible: progress.beginner.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers
        },
        {
          stage: 'intermediate',
          completionDate: new Date().toISOString(),
          percentage: progress.intermediate.percentage,
          isEligible: progress.intermediate.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers
        },
        {
          stage: 'advanced',
          completionDate: new Date().toISOString(),
          percentage: progress.advanced.percentage,
          isEligible: progress.advanced.percentage >= 70,
          userRank: leaderboardPosition?.rank,
          totalUsers: leaderboardPosition?.totalUsers
        }
      ]

      setCertificates(certificateData)
    } catch (error) {
      console.error('Error loading certificate data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'beginner':
        return 'from-green-400 to-green-600'
      case 'intermediate':
        return 'from-yellow-400 to-yellow-600'
      case 'advanced':
        return 'from-red-400 to-red-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'beginner':
        return <Star className="h-8 w-8" />
      case 'intermediate':
        return <Trophy className="h-8 w-8" />
      case 'advanced':
        return <Award className="h-8 w-8" />
      default:
        return <Award className="h-8 w-8" />
    }
  }

  const downloadCertificate = async (certificate: CertificateData) => {
    if (!certificateRef.current || !userProfile) return

    setIsGenerating(true)
    setSelectedCertificate(certificate)

    // Wait for the certificate to render properly
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Find the certificate element
      const certificateElement = certificateRef.current
      if (!certificateElement) {
        throw new Error('Certificate element not found')
      }

      const canvas = await html2canvas(certificateElement, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: 800,
        scrollX: 0,
        scrollY: 0
      })

      // Create PDF
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png')
      
      const imgWidth = 297
      const imgHeight = 210
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`NestFT-${certificate.stage}-certificate-${userProfile?.full_name?.replace(/\s+/g, '-')}.pdf`)

      // Show success message
      alert('Certificate downloaded successfully!')

    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('Failed to generate certificate. Please try again.')
    } finally {
      setIsGenerating(false)
      setSelectedCertificate(null)
    }
  }

  const shareCertificate = async (certificate: CertificateData) => {
    if (!userProfile) {
      alert('User profile not loaded. Please try again.')
      return
    }

    const shareText = `🎉 I just earned my ${certificate.stage.charAt(0).toUpperCase() + certificate.stage.slice(1)} Developer Certificate from NestFT.dev! 
    
${includeRanking && certificate.userRank ? `🏆 Currently ranked #${certificate.userRank} out of ${certificate.totalUsers} developers!` : ''}

Join me in building real projects and advancing your tech career! 💻

#WebDevelopment #Coding #TechCareer #NestFTdev`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${certificate.stage.charAt(0).toUpperCase() + certificate.stage.slice(1)} Developer Certificate`,
          text: shareText,
          url: window.location.origin
        })
      } catch (shareError) {
        console.log('Error sharing:', shareError)
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText + `\n\n${window.location.origin}`)
        alert('Certificate details copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing certificate:', error)
      alert('Failed to share certificate. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
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
              Celebrate your achievements! Download and share your completion certificates for each development stage.
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
              <Card className={`relative overflow-hidden ${certificate.isEligible ? 'ring-2 ring-primary' : 'opacity-75'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${getStageColor(certificate.stage)} opacity-10`} />
                
                <CardHeader className="text-center relative z-10">
                  <div className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-br ${getStageColor(certificate.stage)} text-white`}>
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
                      className={`h-3 rounded-full bg-gradient-to-r ${getStageColor(certificate.stage)} transition-all duration-300`}
                      style={{ width: `${Math.min(certificate.percentage, 100)}%` }}
                    />
                  </div>

                  {certificate.isEligible ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Certificate Available!</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          onClick={() => downloadCertificate(certificate)}
                          disabled={isGenerating}
                          className="w-full"
                          type="button"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {isGenerating ? 'Generating...' : 'Download Certificate'}
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
                        {Math.ceil((70 - certificate.percentage) * 20 / 100)} more projects needed
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
                Show your competitive ranking among all developers on the platform
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hidden Certificate Template */}
        {selectedCertificate && userProfile && (
          <div className="fixed -top-[9999px] left-0">
            <div
              ref={certificateRef}
              className="w-[1200px] h-[800px] bg-white p-16 relative overflow-hidden print:block"
              style={{ fontFamily: 'serif' }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary rounded-full" />
                <div className="absolute top-20 right-20 w-24 h-24 border-4 border-secondary rounded-full" />
                <div className="absolute bottom-20 left-20 w-28 h-28 border-4 border-accent rounded-full" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-4 border-primary rounded-full" />
              </div>

              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">N</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">NestFT.dev</h1>
                </div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">Certificate of Completion</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
              </div>

              {/* Main Content */}
              <div className="text-center mb-12">
                <p className="text-lg text-gray-600 mb-8">This is to certify that</p>
                
                <h3 className="text-5xl font-bold text-gray-800 mb-8 border-b-2 border-gray-300 pb-4 inline-block px-8">
                  {userProfile?.full_name || 'Developer'}
                </h3>
                
                <p className="text-lg text-gray-600 mb-4">
                  has successfully completed the
                </p>
                
                <div className={`inline-block px-8 py-4 rounded-lg bg-gradient-to-r ${getStageColor(selectedCertificate.stage)} text-white mb-8`}>
                  <h4 className="text-3xl font-bold capitalize">
                    {selectedCertificate.stage} Developer Program
                  </h4>
                </div>
                
                <p className="text-lg text-gray-600 mb-8">
                  demonstrating proficiency in web development technologies and completing {selectedCertificate.percentage}% of required projects
                </p>

                {includeRanking && selectedCertificate.userRank && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8 inline-block">
                    <p className="text-lg font-semibold text-yellow-800">
                      🏆 Ranked #{selectedCertificate.userRank} out of {selectedCertificate.totalUsers} developers
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Issued: {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">NestFT.dev Platform</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="border-t-2 border-gray-400 pt-2 px-8 mt-4">
                    <p className="text-lg font-semibold text-gray-800">NestFT.dev</p>
                    <p className="text-sm text-gray-600">Authorized Signature</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="w-24 h-24 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2">
                    <Award className="h-12 w-12 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500">Official Seal</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <p className="text-xs text-gray-400">
                  Certificate ID: NFTD-{selectedCertificate.stage.toUpperCase()}-{user?.id?.slice(0, 8) || 'USER'}-{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        )}

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
                    {certificates.filter(c => c.isEligible).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Certificates Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">
                    {userProfile?.total_points || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">
                    {userProfile?.current_stage?.charAt(0).toUpperCase() + userProfile?.current_stage?.slice(1) || 'Beginner'}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">
                    {userProfile?.streak_days || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}