"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CodingStats() {
  const GITHUB_USERNAME = "noviciusss";
  const LEETCODE_USERNAME = "Sam_9415";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // GitHub API for user profile data
  const { data: githubUserData, error: githubUserError, isLoading: githubUserLoading } = useSWR(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000,
    }
  );
  
  // Use useTheme to dynamically switch SVG parameters
  const { resolvedTheme } = useTheme();
  
  // Default to dark theme parameters during server side render to match baseline,
  // then toggle dynamically based on resolvedTheme
  const bg_color = mounted && resolvedTheme === "light" ? "EDEBE4" : "0B0D0C";
  const text_color = mounted && resolvedTheme === "light" ? "111111" : "EDEBE4";

  // GitHub Stats Card URLs styled to match our phosphor green & near-black palette
  const githubStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&bg_color=${bg_color}&text_color=${text_color}&icon_color=7FE08A&title_color=7FE08A&count_private=true&hide_border=true`;
  
  // LeetCode API Fetch
  const { data: leetcodeData, error: leetcodeError, isLoading: leetcodeLoading } = useSWR(
    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000,
    }
  );
  
  const fallbackLeetcodeStats = {
    problemsSolved: 200,
    ranking: 45000,
    contestRating: 1750,
    username: LEETCODE_USERNAME,
    problems: {
      easy: 108,
      medium: 89,
      hard: 3
    }
  };
  
  const leetcodeStats = {
    problemsSolved: leetcodeData?.solvedProblem || fallbackLeetcodeStats.problemsSolved,
    ranking: leetcodeData?.ranking || fallbackLeetcodeStats.ranking,
    contestRating: leetcodeData?.contestRating || fallbackLeetcodeStats.contestRating,
    username: LEETCODE_USERNAME,
    problems: {
      easy: leetcodeData?.easySolved || fallbackLeetcodeStats.problems.easy,
      medium: leetcodeData?.mediumSolved || fallbackLeetcodeStats.problems.medium,
      hard: leetcodeData?.hardSolved || fallbackLeetcodeStats.problems.hard
    },
    acceptanceRate: leetcodeData?.acceptanceRate || 70
  };
  
  const leetcodeRatingPercentage = (leetcodeStats.contestRating / 3000) * 100;
  
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background" id="coding-stats">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 06</span>
        <h2 className="nb-section-heading">Activity Log</h2>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Real-time activity logs. Integrates live webhook tracking from GitHub profile contributions and LeetCode solve counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-[3px] border-border bg-card rounded-none h-full shadow-[6px_6px_0_0_var(--amber)]">
              <CardHeader className="border-b-[3px] border-border pb-4 mb-4 flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FaGithub size={24} className="text-foreground" />
                  <CardTitle className="text-lg font-display font-black text-foreground uppercase">GitHub Engine</CardTitle>
                </div>
                <a 
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-bold"
                >
                  {githubUserLoading ? (
                    <Skeleton className="h-6 w-20 bg-muted" />
                  ) : (
                    <>
                      {mounted && githubUserData?.avatar_url && (
                        <Avatar className="h-5 w-5 border-2 border-border rounded-none">
                          <AvatarImage src={githubUserData.avatar_url} alt="GitHub Avatar" />
                          <AvatarFallback className="bg-muted text-[10px]">GH</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="border-b-2 border-border/40">@{GITHUB_USERNAME}</span>
                    </>
                  )}
                </a>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Stats Readout Image */}
                <div className="border-[3px] border-border bg-black/45 rounded-none overflow-hidden flex items-center justify-center p-2 shadow-[3px_3px_0_0_var(--border)]">
                  {mounted && (
                    <Image
                      src={githubStatsUrl}
                      alt="GitHub Stats"
                      width={480}
                      height={190}
                      className="w-full h-auto grayscale opacity-90 contrast-[1.05]"
                      unoptimized
                    />
                  )}
                </div>
                
                {/* Custom info */}
                <div className="border-t-[3px] border-border/20 pt-4 space-y-2.5 font-mono text-[10px] text-muted-foreground font-bold">
                  <div className="flex justify-between border-b border-border/10 pb-1">
                    <span>// RUNTIME_LOCATION</span>
                    <span className="text-foreground">{githubUserData?.location || "India"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/10 pb-1">
                    <span>// ACCOUNT_CREATED</span>
                    <span className="text-foreground">
                      {githubUserData ? new Date(githubUserData.created_at).toLocaleDateString() : "2023"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>// TOTAL_REPOS</span>
                    <span className="text-accent font-black">{githubUserData?.public_repos || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LeetCode Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Card className="border-[3px] border-border bg-card rounded-none h-full shadow-[6px_6px_0_0_var(--accent)]">
              <CardHeader className="border-b-[3px] border-border pb-4 mb-4 flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SiLeetcode size={24} className="text-foreground" />
                  <CardTitle className="text-lg font-display font-black text-foreground uppercase">Algorithmic Engine</CardTitle>
                </div>
                <a 
                  href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors font-bold border-b-2 border-border/40"
                >
                  <span>@{LEETCODE_USERNAME}</span>
                </a>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {leetcodeLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 bg-muted" />
                    <Skeleton className="h-16 bg-muted" />
                  </div>
                ) : (
                  <>
                    {/* Problems Stats grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border-2 border-border bg-background p-3 font-mono shadow-[2.5px_2.5px_0_0_var(--border)]">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">// SOLVED</span>
                        <div className="text-base font-black text-accent mt-1">{leetcodeStats.problemsSolved}</div>
                      </div>
                      <div className="border-2 border-border bg-background p-3 font-mono shadow-[2.5px_2.5px_0_0_var(--border)]">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">// RATING</span>
                        <div className="text-base font-black text-foreground mt-1">{leetcodeStats.contestRating}</div>
                      </div>
                      <div className="border-2 border-border bg-background p-3 font-mono shadow-[2.5px_2.5px_0_0_var(--border)]">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">// RANKING</span>
                        <div className="text-base font-black text-foreground mt-1">#{leetcodeStats.ranking}</div>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div className="space-y-3 font-mono text-[10px] text-muted-foreground font-bold">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>// RESOLUTION_DISTRIBUTION</span>
                          <span className="text-accent">
                            E: {leetcodeStats.problems.easy} · M: {leetcodeStats.problems.medium} · H: {leetcodeStats.problems.hard}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t-[2px] border-border/20">
                        <div className="flex justify-between">
                          <span>// RATING_PERCENTILE</span>
                          <span className="text-foreground">{leetcodeStats.contestRating} / 3000</span>
                        </div>
                        <Progress 
                          value={leetcodeRatingPercentage}
                          className="h-3 bg-background border-2 border-border shadow-[1.5px_1.5px_0_0_var(--border)] rounded-none"
                        />
                      </div>
                      
                      {leetcodeData?.acceptanceRate && (
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between">
                            <span>// SUBMISSION_ACCEPTANCE</span>
                            <span className="text-foreground">{leetcodeData.acceptanceRate}%</span>
                          </div>
                          <Progress 
                            value={parseFloat(leetcodeData.acceptanceRate)}
                            className="h-3 bg-background border-2 border-border shadow-[1.5px_1.5px_0_0_var(--border)] rounded-none"
                          />
                        </div>
                      )}
                    </div>
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