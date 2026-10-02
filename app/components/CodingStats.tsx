"use client";
import { useMemo } from "react";
import useSWR from "swr";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GITHUB_USERNAME = "noviciusss";
const LEETCODE_USERNAME = "Sam_9415";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export default function CodingStats() {
  const { data: githubUserData } = useSWR(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 3600000 }
  );

  const { data: leetcodeData } = useSWR(
    `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 3600000 }
  );

  const stats = useMemo(() => {
    return {
      githubRepos: githubUserData?.public_repos || 25,
      githubFollowers: githubUserData?.followers || 8,
      leetcodeSolved: leetcodeData?.totalSolved || 180,
      leetcodeEasy: leetcodeData?.easySolved || 85,
      leetcodeMedium: leetcodeData?.mediumSolved || 80,
      leetcodeHard: leetcodeData?.hardSolved || 15,
      leetcodeRanking: leetcodeData?.ranking || "Top 15%",
    };
  }, [githubUserData, leetcodeData]);

  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="activity">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// ACTIVITY_LOG</span>
        <h2 className="nb-section-heading">Activity</h2>

        <div className="mb-10 max-w-xl text-sm text-muted-foreground font-sans">
          <p>
            Public engineering activity tracked across GitHub open-source repositories and LeetCode algorithmic problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub Stats Card */}
          <Card className="border-[3px] border-border bg-card rounded-none shadow-[6px_6px_0_0_var(--ink)]">
            <CardHeader className="border-b-[3px] border-border pb-4 mb-4 flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FiGithub size={24} className="text-foreground" />
                <CardTitle className="text-lg font-display font-black text-foreground uppercase">
                  GitHub Profile
                </CardTitle>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-2.5 bg-background border-2 shadow-[2px_2px_0_0_var(--border)]"
                aria-label="View GitHub profile"
              >
                <FiExternalLink className="h-3 w-3" />
              </a>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="border-2 border-border p-3 bg-canvas shadow-[2px_2px_0_0_var(--border)]">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Public Repos</div>
                  <div className="text-2xl font-black text-foreground mt-1">{stats.githubRepos}</div>
                </div>
                <div className="border-2 border-border p-3 bg-canvas shadow-[2px_2px_0_0_var(--border)]">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Followers</div>
                  <div className="text-2xl font-black text-accent mt-1">{stats.githubFollowers}</div>
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground border-t border-border/20 pt-3 flex justify-between">
                <span>// HANDLE</span>
                <span className="text-foreground font-bold">@{GITHUB_USERNAME}</span>
              </div>
            </CardContent>
          </Card>

          {/* LeetCode Stats Card */}
          <Card className="border-[3px] border-border bg-card rounded-none shadow-[6px_6px_0_0_var(--accent)]">
            <CardHeader className="border-b-[3px] border-border pb-4 mb-4 flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SiLeetcode size={24} className="text-foreground" />
                <CardTitle className="text-lg font-display font-black text-foreground uppercase">
                  LeetCode Algorithmic
                </CardTitle>
              </div>
              <a
                href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-2.5 bg-background border-2 shadow-[2px_2px_0_0_var(--border)]"
                aria-label="View LeetCode profile"
              >
                <FiExternalLink className="h-3 w-3" />
              </a>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="border-2 border-border p-2 bg-canvas shadow-[2px_2px_0_0_var(--border)]">
                  <div className="text-[9px] text-emerald-600 font-bold uppercase">Easy</div>
                  <div className="text-lg font-black text-foreground mt-0.5">{stats.leetcodeEasy}</div>
                </div>
                <div className="border-2 border-border p-2 bg-canvas shadow-[2px_2px_0_0_var(--border)]">
                  <div className="text-[9px] text-amber font-bold uppercase">Medium</div>
                  <div className="text-lg font-black text-foreground mt-0.5">{stats.leetcodeMedium}</div>
                </div>
                <div className="border-2 border-border p-2 bg-canvas shadow-[2px_2px_0_0_var(--border)]">
                  <div className="text-[9px] text-red-500 font-bold uppercase">Hard</div>
                  <div className="text-lg font-black text-foreground mt-0.5">{stats.leetcodeHard}</div>
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground border-t border-border/20 pt-3 flex justify-between">
                <span>// TOTAL_SOLVED</span>
                <span className="text-foreground font-bold">{stats.leetcodeSolved} Problems</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}