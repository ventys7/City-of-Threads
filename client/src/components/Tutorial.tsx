import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  target: string;
}

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function Tutorial({ onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TutorialStep[] = [
    {
      id: 1,
      title: "Welcome to City of Threads!",
      description: "Let's take a quick tour to get you started. This will only take 3-5 minutes.",
      target: "intro",
    },
    {
      id: 2,
      title: "Your City Map",
      description: "This is your city with 5 districts. Tap on buildings to collect resources and upgrade them.",
      target: "city-map",
    },
    {
      id: 3,
      title: "Build Your First Shop",
      description: "Shops let you buy and sell items with dynamic pricing. Place your first shop now!",
      target: "build-shop",
    },
    {
      id: 4,
      title: "Create a Microgame",
      description: "Visit the Arcade to create your first microgame using our templates. Others can play and share it!",
      target: "arcade",
    },
    {
      id: 5,
      title: "Solve a Puzzle",
      description: "Complete a spatial puzzle to earn rewards and contribute to your city's progress.",
      target: "puzzles",
    },
    {
      id: 6,
      title: "Vote in Governance",
      description: "Participate in StoryNet voting to shape your city's economy and policies.",
      target: "governance",
    },
    {
      id: 7,
      title: "You're Ready!",
      description: "Great job! You've learned the basics. Start building your dream city!",
      target: "complete",
    },
  ];

  const currentTutorialStep = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Spotlight effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />

      <Card className="w-full max-w-lg relative z-10" data-testid="card-tutorial">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div className="flex-1">
            <CardTitle className="text-xl" data-testid="text-tutorial-title">
              {currentTutorialStep.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkip}
            data-testid="button-skip-tutorial"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />

          <div className="bg-muted/30 p-6 rounded-md min-h-[120px] flex items-center justify-center">
            <p className="text-center" data-testid="text-tutorial-description">
              {currentTutorialStep.description}
            </p>
          </div>

          {currentStep === 0 && (
            <div className="bg-accent/20 p-4 rounded-md text-sm space-y-2">
              <p className="font-semibold">What you'll learn:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Building and upgrading in your city</li>
                <li>Trading in the marketplace</li>
                <li>Creating and playing microgames</li>
                <li>Solving spatial puzzles</li>
                <li>Participating in governance</li>
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              data-testid="button-tutorial-back"
            >
              Back
            </Button>
          )}
          <Button
            className="flex-1"
            onClick={handleNext}
            data-testid="button-tutorial-next"
          >
            {currentStep < steps.length - 1 ? "Next" : "Get Started!"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
