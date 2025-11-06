import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Play, Share2, Plus, Flag, Eye, AlertCircle } from "lucide-react";
import type { Player } from "@shared/schema";
import runnerIcon from "@assets/generated_images/Runner_Template_Icon_52759650.png";

interface Microgame {
  id: string;
  title: string;
  template: string;
  creatorId: string;
  plays: number;
  shares: number;
  quarantined: boolean;
  approved: boolean;
}

interface ArcadePageProps {
  player: Player | null;
}

export default function ArcadePage({ player }: ArcadePageProps) {
  const [selectedGame, setSelectedGame] = useState<Microgame | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const mockGames: Microgame[] = [
    { id: "1", title: "Sky Runner", template: "endless_runner", creatorId: "user1", plays: 1523, shares: 45, quarantined: false, approved: true },
    { id: "2", title: "Block Puzzle Master", template: "puzzle", creatorId: "user2", plays: 892, shares: 23, quarantined: false, approved: true },
    { id: "3", title: "Cookie Clicker Pro", template: "clicker", creatorId: "user3", plays: 156, shares: 5, quarantined: true, approved: false },
    { id: "4", title: "Speed Racer", template: "endless_runner", creatorId: "user4", plays: 2341, shares: 78, quarantined: false, approved: true },
  ];

  const templates = [
    { id: "endless_runner", name: "Endless Runner", description: "Create a fast-paced running game", iconUrl: runnerIcon, avgPlaytime: "45s" },
    { id: "puzzle", name: "Puzzle Game", description: "Design spatial puzzle challenges", iconUrl: runnerIcon, avgPlaytime: "90s" },
    { id: "clicker", name: "Clicker Game", description: "Build an incremental clicker game", iconUrl: runnerIcon, avgPlaytime: "60s" },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Arcade</h1>
          <p className="text-muted-foreground">Play and create microgames</p>
        </div>
        <Button onClick={() => setEditorOpen(true)} data-testid="button-create-game">
          <Plus className="h-4 w-4 mr-2" />
          Create Microgame
        </Button>
      </div>

      <Tabs defaultValue="play" className="space-y-6">
        <TabsList>
          <TabsTrigger value="play" data-testid="tab-play">Play</TabsTrigger>
          <TabsTrigger value="my-games" data-testid="tab-my-games">My Games</TabsTrigger>
        </TabsList>

        <TabsContent value="play" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGames.filter(g => g.approved).map((game) => (
              <Card key={game.id} className="hover-elevate" data-testid={`card-game-${game.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg" data-testid={`text-game-title-${game.id}`}>{game.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="text-xs">
                      {game.template.replace("_", " ")}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary/50" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{game.plays} plays</span>
                    <span>{game.shares} shares</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" onClick={() => setSelectedGame(game)} data-testid={`button-play-${game.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="outline" size="icon" data-testid={`button-share-${game.id}`}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-report-${game.id}`}>
                    <Flag className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-games" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGames.slice(2, 3).map((game) => (
              <Card key={game.id} className="hover-elevate" data-testid={`card-my-game-${game.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {game.title}
                    {game.quarantined && (
                      <Badge variant="secondary" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        Quarantine
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {game.template.replace("_", " ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {game.quarantined && (
                    <div className="bg-accent/20 border border-accent rounded-md p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <p className="font-semibold">Under Review</p>
                          <p className="text-muted-foreground">Limited to 200 plays until approved</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>{game.plays}/200 plays</span>
                        <Badge variant="outline" className="text-xs">Not Monetizable</Badge>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{game.plays} plays</span>
                    <span>{game.shares} shares</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" variant="outline" data-testid={`button-edit-${game.id}`}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedGame(game);
                      setShareModalOpen(true);
                    }}
                    data-testid={`button-share-my-${game.id}`}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Editor Modal */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-editor">
          <DialogHeader>
            <DialogTitle>Create Microgame</DialogTitle>
            <DialogDescription>Choose a template to get started</DialogDescription>
          </DialogHeader>

          {!selectedTemplate ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="hover-elevate cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id)}
                  data-testid={`card-template-${template.id}`}
                >
                  <CardHeader>
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-md flex items-center justify-center mb-3">
                      <img src={template.iconUrl} alt={template.name} className="w-16 h-16" />
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-xs">{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Badge variant="outline" className="text-xs">
                      Avg {template.avgPlaytime}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="game-title">Game Title</Label>
                <Input id="game-title" placeholder="Enter game title" data-testid="input-game-title" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center border-2 border-dashed">
                    <p className="text-sm text-muted-foreground">Game preview</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Properties</Label>
                  <Card>
                    <CardContent className="pt-4 space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Speed</Label>
                        <Input type="range" min="1" max="10" defaultValue="5" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Difficulty</Label>
                        <Input type="range" min="1" max="5" defaultValue="3" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Theme</Label>
                        <Input placeholder="e.g., Space, Forest" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)} data-testid="button-back-templates">
                  Back
                </Button>
                <Button variant="outline" data-testid="button-test-game">
                  Test Game
                </Button>
                <Button className="flex-1" onClick={() => {
                  setEditorOpen(false);
                  setSelectedTemplate(null);
                }} data-testid="button-publish-game">
                  Publish
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent data-testid="dialog-share">
          <DialogHeader>
            <DialogTitle>Share Microgame</DialogTitle>
            <DialogDescription>Share your game with others</DialogDescription>
          </DialogHeader>

          {selectedGame && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Embed Code</Label>
                <Textarea
                  value={`<iframe src="https://cityofthreads.replit.app/game/${selectedGame.id}" />`}
                  readOnly
                  className="font-mono text-xs"
                  data-testid="textarea-embed-code"
                />
                <Button variant="outline" size="sm" className="w-full" data-testid="button-copy-embed">
                  Copy Embed Code
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Direct Link</Label>
                <div className="flex gap-2">
                  <Input
                    value={`https://cityofthreads.replit.app/game/${selectedGame.id}`}
                    readOnly
                    className="text-sm"
                    data-testid="input-direct-link"
                  />
                  <Button variant="outline" data-testid="button-copy-link">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md space-y-2">
                <h4 className="font-semibold text-sm">Analytics</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Plays</p>
                    <p className="font-bold text-lg">{selectedGame.plays}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shares</p>
                    <p className="font-bold text-lg">{selectedGame.shares}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareModalOpen(false)} data-testid="button-close-share">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
