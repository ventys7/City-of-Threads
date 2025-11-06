import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, Plus, FileText, Clock, TrendingUp } from "lucide-react";
import type { Player } from "@shared/schema";
import mayorIcon from "@assets/generated_images/Mayor_Character_Portrait_c532b442.png";
import advisorIcon from "@assets/generated_images/Advisor_Character_Portrait_facda006.png";
import knightIcon from "@assets/generated_images/Knight_Character_Portrait_19cf4d02.png";

interface Policy {
  id: string;
  title: string;
  description: string;
  parameter: string;
  currentValue: number;
  proposedValue: number;
  votesFor: number;
  votesAgainst: number;
  status: string;
  proposerId: string;
}

interface GovernancePageProps {
  player: Player | null;
}

export default function GovernancePage({ player }: GovernancePageProps) {
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [electionModalOpen, setElectionModalOpen] = useState(false);

  const mockGovernance = {
    mayorId: "user1",
    mayorName: "Alex Builder",
    viceMayors: [
      { id: "user2", name: "Jordan Crafter" },
      { id: "user3", name: "Sam Designer" },
    ],
  };

  const mockPolicies: Policy[] = [
    {
      id: "1",
      title: "Reduce Packaging Tax",
      description: "Lower the tax on item packaging to stimulate trade",
      parameter: "packaging_tax",
      currentValue: 0.15,
      proposedValue: 0.10,
      votesFor: 234,
      votesAgainst: 89,
      status: "active",
      proposerId: "user1",
    },
    {
      id: "2",
      title: "Increase Resource Decay Rate",
      description: "Faster resource decay to encourage more active trading",
      parameter: "decay_rate",
      currentValue: 0.02,
      proposedValue: 0.05,
      votesFor: 156,
      votesAgainst: 178,
      status: "active",
      proposerId: "user2",
    },
  ];

  const mockLedger = [
    { id: "1", action: "Policy Enacted", actor: "Mayor Alex", details: "Packaging Tax reduced to 10%", impact: "+12% trade volume", timestamp: "2 hours ago" },
    { id: "2", action: "Vice-Mayor Appointed", actor: "Mayor Alex", details: "Jordan Crafter appointed as Vice-Mayor", impact: "N/A", timestamp: "1 day ago" },
    { id: "3", action: "Election Held", actor: "System", details: "Alex Builder elected as Mayor", impact: "N/A", timestamp: "7 days ago" },
  ];

  const candidates = [
    { id: "c1", name: "Alex Builder", platform: "Focus on economic growth", endorsements: 456, avatar: mayorIcon },
    { id: "c2", name: "Jordan Crafter", platform: "Strengthen UGC ecosystem", endorsements: 398, avatar: advisorIcon },
    { id: "c3", name: "Sam Designer", platform: "Enhance city aesthetics", endorsements: 287, avatar: knightIcon },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Governance</h1>
        <p className="text-muted-foreground">Participate in city decision-making</p>
      </div>

      <Tabs defaultValue="voting" className="space-y-6">
        <TabsList>
          <TabsTrigger value="voting" data-testid="tab-voting">StoryNet Voting</TabsTrigger>
          <TabsTrigger value="officials" data-testid="tab-officials">Officials</TabsTrigger>
          <TabsTrigger value="ledger" data-testid="tab-ledger">Public Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="voting" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-semibold">Active Proposals</h2>
            <Button onClick={() => setProposeModalOpen(true)} data-testid="button-propose-policy">
              <Plus className="h-4 w-4 mr-2" />
              Propose Policy
            </Button>
          </div>

          <div className="space-y-4">
            {mockPolicies.map((policy) => {
              const totalVotes = policy.votesFor + policy.votesAgainst;
              const approvalRate = totalVotes > 0 ? (policy.votesFor / totalVotes) * 100 : 0;

              return (
                <Card key={policy.id} className="hover-elevate" data-testid={`card-policy-${policy.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg" data-testid={`text-policy-title-${policy.id}`}>
                          {policy.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{policy.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        12h left
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-muted-foreground">Current Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{(policy.currentValue * 100).toFixed(0)}%</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-muted-foreground">Proposed Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-primary">{(policy.proposedValue * 100).toFixed(0)}%</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Approval</span>
                        <span className="font-semibold">{approvalRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={approvalRate} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{policy.votesFor} for</span>
                        <span>{policy.votesAgainst} against</span>
                      </div>
                    </div>

                    <div className="bg-accent/20 p-3 rounded-md">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold">Projected Impact</p>
                          <p className="text-muted-foreground">
                            +15% shop transactions, +8% player satisfaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setSelectedPolicy(policy);
                        setVoteModalOpen(true);
                      }}
                      data-testid={`button-vote-${policy.id}`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Vote
                    </Button>
                    <Button variant="outline" className="flex-1" data-testid={`button-details-${policy.id}`}>
                      <FileText className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="officials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-semibold">City Officials</h2>
            <Button onClick={() => setElectionModalOpen(true)} data-testid="button-start-election">
              Start Election
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mayor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={mayorIcon} alt="Mayor" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg" data-testid="text-mayor-name">{mockGovernance.mayorName}</h3>
                  <p className="text-sm text-muted-foreground">Term 1 • Elected 7 days ago</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vice-Mayors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGovernance.viceMayors.map((vice, index) => (
                <div key={vice.id} className="flex items-center gap-4 p-3 rounded-md bg-muted/30">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={index === 0 ? advisorIcon : knightIcon} alt={vice.name} />
                    <AvatarFallback>{vice.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold" data-testid={`text-vice-mayor-${index}`}>{vice.name}</h4>
                    <p className="text-xs text-muted-foreground">Vice-Mayor {index + 1}</p>
                  </div>
                </div>
              ))}
              {mockGovernance.viceMayors.length < 3 && (
                <Button variant="outline" className="w-full" data-testid="button-appoint-vice">
                  <Plus className="h-4 w-4 mr-2" />
                  Appoint Vice-Mayor
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Public Ledger</h2>
          <div className="space-y-2">
            {mockLedger.map((entry) => (
              <Card key={entry.id} data-testid={`ledger-entry-${entry.id}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{entry.action}</Badge>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium">{entry.details}</p>
                      {entry.impact !== "N/A" && (
                        <p className="text-xs text-muted-foreground mt-1">Impact: {entry.impact}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.actor}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Vote Modal */}
      <Dialog open={voteModalOpen} onOpenChange={setVoteModalOpen}>
        <DialogContent data-testid="dialog-vote">
          <DialogHeader>
            <DialogTitle>Cast Your Vote</DialogTitle>
            <DialogDescription>
              {selectedPolicy?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm">{selectedPolicy?.description}</p>
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => setVoteModalOpen(false)}
                data-testid="button-vote-for"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Vote For
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setVoteModalOpen(false)}
                data-testid="button-vote-against"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Vote Against
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Propose Policy Modal */}
      <Dialog open={proposeModalOpen} onOpenChange={setProposeModalOpen}>
        <DialogContent data-testid="dialog-propose">
          <DialogHeader>
            <DialogTitle>Propose New Policy</DialogTitle>
            <DialogDescription>Submit a policy for community voting</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="policy-title">Title</Label>
              <Input id="policy-title" placeholder="Policy title" data-testid="input-policy-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policy-description">Description</Label>
              <Textarea
                id="policy-description"
                placeholder="Describe the policy and its benefits"
                data-testid="textarea-policy-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parameter">Parameter</Label>
                <Input id="parameter" placeholder="e.g., tax_rate" data-testid="input-parameter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposed-value">Proposed Value</Label>
                <Input id="proposed-value" type="number" step="0.01" data-testid="input-proposed-value" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProposeModalOpen(false)} data-testid="button-cancel-propose">
              Cancel
            </Button>
            <Button onClick={() => setProposeModalOpen(false)} data-testid="button-submit-policy">
              Submit Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Election Modal */}
      <Dialog open={electionModalOpen} onOpenChange={setElectionModalOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-election">
          <DialogHeader>
            <DialogTitle>Mayor Election</DialogTitle>
            <DialogDescription>Vote for the next city mayor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="hover-elevate" data-testid={`card-candidate-${candidate.id}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{candidate.platform}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {candidate.endorsements} endorsements
                        </Badge>
                      </div>
                    </div>
                    <Button data-testid={`button-vote-candidate-${candidate.id}`}>
                      Vote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
