import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trophy, Star } from "lucide-react";
import type { Player } from "@shared/schema";

interface SpatialPuzzle {
  id: string;
  title: string;
  district: string;
  difficulty: number;
  completions: number;
  creatorId: string;
}

interface PuzzlesPageProps {
  player: Player | null;
}

export default function PuzzlesPage({ player }: PuzzlesPageProps) {
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState<SpatialPuzzle | null>(null);
  const [placementMode, setPlacementMode] = useState(false);

  const mockPuzzles: SpatialPuzzle[] = [
    { id: "1", title: "The Ancient Lock", district: "center", difficulty: 3, completions: 156, creatorId: "user1" },
    { id: "2", title: "Garden Maze", district: "north", difficulty: 2, completions: 234, creatorId: "user2" },
    { id: "3", title: "Crystal Alignment", district: "east", difficulty: 5, completions: 45, creatorId: "user3" },
    { id: "4", title: "Bridge Builder", district: "west", difficulty: 4, completions: 89, creatorId: "user4" },
  ];

  const puzzlePieces = [
    { id: "cube", name: "Cube", color: "bg-blue-500" },
    { id: "sphere", name: "Sphere", color: "bg-green-500" },
    { id: "pyramid", name: "Pyramid", color: "bg-purple-500" },
    { id: "cylinder", name: "Cylinder", color: "bg-orange-500" },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Spatial Puzzles</h1>
          <p className="text-muted-foreground">Create and solve 3D puzzles in your city</p>
        </div>
        <Button onClick={() => setCreatorOpen(true)} data-testid="button-create-puzzle">
          <Plus className="h-4 w-4 mr-2" />
          Create Puzzle
        </Button>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse" data-testid="tab-browse">Browse</TabsTrigger>
          <TabsTrigger value="my-puzzles" data-testid="tab-my-puzzles">My Puzzles</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPuzzles.map((puzzle) => (
              <Card key={puzzle.id} className="hover-elevate" data-testid={`card-puzzle-${puzzle.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span data-testid={`text-puzzle-title-${puzzle.id}`}>{puzzle.title}</span>
                    <div className="flex">
                      {[...Array(puzzle.difficulty)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="text-xs">
                      {puzzle.district.charAt(0).toUpperCase() + puzzle.district.slice(1)} District
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-md flex items-center justify-center border">
                    <div className="grid grid-cols-3 gap-2 p-4">
                      {puzzlePieces.slice(0, 6).map((piece, i) => (
                        <div key={i} className={`w-8 h-8 rounded ${piece.color}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span>{puzzle.completions} solved</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {(puzzle.completions / 300 * 100).toFixed(0)}% rate
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedPuzzle(puzzle)}
                    data-testid={`button-attempt-${puzzle.id}`}
                  >
                    Attempt Puzzle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-puzzles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPuzzles.slice(0, 1).map((puzzle) => (
              <Card key={puzzle.id} className="hover-elevate" data-testid={`card-my-puzzle-${puzzle.id}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{puzzle.title}</span>
                    <div className="flex">
                      {[...Array(puzzle.difficulty)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardTitle>
                  <CardDescription>{puzzle.district.charAt(0).toUpperCase() + puzzle.district.slice(1)} District</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span>{puzzle.completions} solves</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" data-testid={`button-edit-puzzle-${puzzle.id}`}>
                    Edit
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid={`button-delete-puzzle-${puzzle.id}`}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Creator Modal */}
      <Dialog open={creatorOpen} onOpenChange={setCreatorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]" data-testid="dialog-creator">
          <DialogHeader>
            <DialogTitle>Create Spatial Puzzle</DialogTitle>
            <DialogDescription>Place pieces in 3D space to create a puzzle</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="puzzle-title">Puzzle Title</Label>
                <Input id="puzzle-title" placeholder="Enter title" data-testid="input-puzzle-title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input id="district" placeholder="center, north, etc." data-testid="input-district" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty (1-5)</Label>
                <Input id="difficulty" type="number" min="1" max="5" defaultValue="3" data-testid="input-difficulty" />
              </div>
            </div>

            {!placementMode ? (
              <div className="space-y-2">
                <Label>Puzzle Pieces Palette</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {puzzlePieces.map((piece) => (
                    <Button
                      key={piece.id}
                      variant="outline"
                      className="h-24 flex-col gap-2"
                      data-testid={`button-piece-${piece.id}`}
                    >
                      <div className={`w-12 h-12 rounded ${piece.color}`} />
                      <span className="text-xs">{piece.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Placement Grid</Label>
                <div className="aspect-square bg-muted/30 rounded-md border-2 border-dashed p-4">
                  <div className="w-full h-full grid grid-cols-8 gap-1">
                    {[...Array(64)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square border border-border/50 hover-elevate cursor-pointer rounded-sm"
                        data-testid={`grid-cell-${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPlacementMode(!placementMode)}
                data-testid="button-toggle-placement"
              >
                {placementMode ? "Back to Palette" : "Start Placement"}
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setCreatorOpen(false);
                  setPlacementMode(false);
                }}
                data-testid="button-save-puzzle"
              >
                Save Puzzle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attempt Puzzle Modal */}
      <Dialog open={selectedPuzzle !== null} onOpenChange={() => setSelectedPuzzle(null)}>
        <DialogContent className="max-w-2xl" data-testid="dialog-attempt">
          <DialogHeader>
            <DialogTitle>{selectedPuzzle?.title}</DialogTitle>
            <DialogDescription>
              Solve this puzzle by arranging the pieces correctly
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-background rounded-md border p-4">
              <div className="w-full h-full grid grid-cols-6 gap-2">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square border border-border/50 hover-elevate cursor-pointer rounded"
                    data-testid={`puzzle-cell-${i}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedPuzzle(null)} data-testid="button-give-up">
                Give Up
              </Button>
              <Button variant="outline" data-testid="button-hint">
                Hint
              </Button>
              <Button className="flex-1" data-testid="button-submit-solution">
                Submit Solution
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
