"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CodingStats() {
  const GITHUB_USERNAME = "noviciusss"; // Your GitHub username
  const LEETCODE_USERNAME = "Sam_9415"; // Your LeetCode username
  
  // GitHub API for user profile data
  const { data: githubUserData, error: githubUserError, isLoading: githubUserLoading } = useSWR(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // Cache for 1 hour
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      }
    }
  );
  
  // GitHub Stats Card URLs
  const githubStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=radical&count_private=true&hide_border=true`;
  const githubStreakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=radical&hide_border=true`;
  
  // LeetCode API Fetch
  const { data: leetcodeData, error: leetcodeError, isLoading: leetcodeLoading } = useSWR(
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // Cache for 1 hour
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      }
    }
  );
  
  // For contribution data
  const [activePercentage, setActivePercentage] = useState<number>(75);
  
  // Fallback LeetCode stats
  const fallbackLeetcodeStats = {
    problemsSolved: 250,
    ranking: 45000,
    contestRating: 1750,
    username: LEETCODE_USERNAME,
    problems: {
      easy: 100,
      medium: 120,
      hard: 30
    }
  };
  
  // Use dynamic data if available, otherwise use fallback
  const leetcodeStats = {
    problemsSolved: leetcodeData?.totalSolved || fallbackLeetcodeStats.problemsSolved,
    ranking: leetcodeData?.ranking || fallbackLeetcodeStats.ranking,
    contestRating: leetcodeData?.contestRating || fallbackLeetcodeStats.contestRating,
    username: LEETCODE_USERNAME,
    problems: {
      easy: leetcodeData?.easySolved || fallbackLeetcodeStats.problems.easy,
      medium: leetcodeData?.mediumSolved || fallbackLeetcodeStats.problems.medium,
      hard: leetcodeData?.hardSolved || fallbackLeetcodeStats.problems.hard
    },
    acceptanceRate: leetcodeData?.acceptanceRate || 70 // Default acceptance rate
  };
  
  // Calculate the rating percentages for visualization
  const leetcodeRatingPercentage = (leetcodeStats.contestRating / 3000) * 100;
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-850">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
          >
            Development Metrics
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Coding Activity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            My development metrics and problem-solving statistics
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaGithub size={30} className="text-white" />
                    <CardTitle className="text-2xl font-heading text-white">GitHub Stats</CardTitle>
                  </div>
                  <a 
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {githubUserLoading ? (
                      <Skeleton className="h-8 w-24 bg-gray-700" />
                    ) : (
                      <>
                        <Avatar className="h-6 w-6 border border-gray-700">
                          <AvatarImage src={githubUserData?.avatar_url} alt="GitHub Avatar" />
                          <AvatarFallback className="bg-gray-700 text-xs">GH</AvatarFallback>
                        </Avatar>
                        @{GITHUB_USERNAME}
                      </>
                    )}
                  </a>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2 pb-6">
                <div className="space-y-4 overflow-hidden">
                  {/* GitHub Stats Card */}
                  <div className="rounded-lg overflow-hidden border border-gray-800">
                    <img 
                      src={githubStatsUrl} 
                      alt="GitHub Stats" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  
                  {/* GitHub Top Languages Card */}
                  
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-300">Active days this year</p>
                    <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">
                      {activePercentage}%
                    </Badge>
                  </div>
                  <Progress 
                    value={activePercentage}
                    className="h-3 bg-white/10"
                  />
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                      {githubUserData?.location || "Location"}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                      Joined: {githubUserData ? new Date(githubUserData.created_at).getFullYear() : ""}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                      Following: {githubUserData?.following || 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-yellow-600 to-orange-700 text-white h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SiLeetcode size={30} className="text-white" />
                    <CardTitle className="text-2xl font-heading text-white">LeetCode Stats</CardTitle>
                  </div>
                  <a 
                    href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm text-yellow-200 hover:text-white transition-colors"
                  >
                    @{LEETCODE_USERNAME}
                  </a>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2 pb-6">
                {leetcodeLoading ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[1,2,3,4].map(i => (
                      <Skeleton key={i} className="h-24 rounded-lg bg-yellow-900/30" />
                    ))}
                  </div>
                ) : leetcodeError ? (
                  <div className="p-4 text-center">
                    <p className="text-yellow-200 mb-1">Error loading LeetCode data</p>
                    <p className="text-xs text-yellow-200/70">Using estimated statistics</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                      <Card className="bg-white/10 border-none overflow-hidden">
                        <CardContent className="p-4">
                          <p className="text-sm text-yellow-200 mb-1">Problems Solved</p>
                          <p className="text-3xl font-bold text-white">{fallbackLeetcodeStats.problemsSolved}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/10 border-none overflow-hidden">
                        <CardContent className="p-4">
                          <p className="text-sm text-yellow-200 mb-1">Global Ranking</p>
                          <div className="flex items-end gap-1">
                            <p className="text-3xl font-bold text-white">#{fallbackLeetcodeStats.ranking}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-yellow-200">Contest Rating</p>
                        <Badge variant="outline" className="bg-yellow-600/30 text-yellow-200 border-yellow-500">
                          {fallbackLeetcodeStats.contestRating}
                        </Badge>
                      </div>
                      <Progress 
                        value={(fallbackLeetcodeStats.contestRating / 3000) * 100}
                        className="h-3 bg-white/10"
                      />
                    </div>
                    
                    
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card className="bg-white/10 border-none overflow-hidden">
                        <CardContent className="p-4">
                          <p className="text-sm text-yellow-200 mb-1">Problems Solved</p>
                          <p className="text-3xl font-bold text-white">{leetcodeStats.problemsSolved}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/10 border-none overflow-hidden">
                        <CardContent className="p-4">
                          <p className="text-sm text-yellow-200 mb-1">Global Ranking</p>
                          <div className="flex items-end gap-1">
                            <p className="text-3xl font-bold text-white">#{leetcodeStats.ranking}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-yellow-200">Contest Rating</p>
                        <Badge variant="outline" className="bg-yellow-600/30 text-yellow-200 border-yellow-500">
                          {leetcodeStats.contestRating}
                        </Badge>
                      </div>
                      <Progress 
                        value={leetcodeRatingPercentage}
                        className="h-3 bg-white/10"
                        indicatorClassName="bg-yellow-300"
                      />
                    </div>
                    
                    {leetcodeData?.acceptanceRate && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-yellow-200">Acceptance Rate</p>
                          <Badge variant="outline" className="bg-yellow-600/30 text-yellow-200 border-yellow-500">
                            {leetcodeData.acceptanceRate}%
                          </Badge>
                        </div>
                        <Progress 
                          value={parseFloat(leetcodeData.acceptanceRate)}
                          className="h-3 bg-white/10"
                          indicatorClassName="bg-green-400"
                        />
                      </div>
                    )}
                    
                
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}