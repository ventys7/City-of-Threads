import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TownTemplate {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  startingResources: {
    coins: number;
    credits: number;
  };
  recommendedFor: string;
}

interface TownTemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export function TownTemplateSelector({ onSelect }: TownTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: TownTemplate[] = [
    {
      id: "starter",
      name: "Starter Town",
      description: "Perfect for newcomers who want a balanced beginning",
      benefits: [
        "Balanced resources",
        "Basic tutorial guidance",
        "Gradual learning curve",
      ],
      startingResources: {
        coins: 1000,
        credits: 100,
      },
      recommendedFor: "New players",
    },
    {
      id: "balanced",
      name: "Balanced Hub",
      description: "Versatile setup for players who want flexibility",
      benefits: [
        "Extra starting coins",
        "Mixed building types",
        "Good for experimentation",
      ],
      startingResources: {
        coins: 1500,
        credits: 75,
      },
      recommendedFor: "All playstyles",
    },
    {
      id: "creator",
      name: "Creator's Haven",
      description: "Optimized for players focused on UGC creation",
      benefits: [
        "Extra credits for tools",
        "Unlocked creator features",
        "Bonus microgame slots",
      ],
      startingResources: {
        coins: 800,
        credits: 150,
      },
      recommendedFor: "Content creators",
    },
  ];

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-2" data-testid="text-template-title">
            Choose Your Town Template
          </h1>
          <p className="text-muted-foreground">
            Select the starting template that matches your playstyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <Card
                key={template.id}
                className={`hover-elevate cursor-pointer transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTemplate(template.id)}
                data-testid={`card-template-${template.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl" data-testid={`text-template-name-${template.id}`}>
                        {template.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{template.description}</CardDescription>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="mt-3 w-fit">
                    {template.recommendedFor}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-md space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Starting Coins:</span>
                      <span className="font-semibold">{template.startingResources.coins}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Starting Credits:</span>
                      <span className="font-semibold text-primary">{template.startingResources.credits}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Benefits:</p>
                    <ul className="space-y-1">
                      {template.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            disabled={!selectedTemplate}
            onClick={() => selectedTemplate && onSelect(selectedTemplate)}
            data-testid="button-confirm-template"
          >
            {selectedTemplate ? "Start Building!" : "Select a Template"}
          </Button>
        </div>
      </div>
    </div>
  );
}
