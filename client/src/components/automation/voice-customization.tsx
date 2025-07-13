import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Volume2,
  PlayCircle,
  Upload,
  Bot,
  Globe,
  PlusCircle,
  FileAudio,
  AudioWaveform,
} from "lucide-react";

const availableVoices = [
  { id: "voice-1", name: "Ava (Female)", accent: "American", style: "Professional", preview: "" },
  { id: "voice-2", name: "Leo (Male)", accent: "British", style: "Friendly", preview: "" },
  { id: "voice-3", name: "Zoe (Female)", accent: "Australian", style: "Calm", preview: "" },
  { id: "voice-4", name: "Rohan (Male)", accent: "Indian", style: "Assertive", preview: "" },
];

export function VoiceCustomization() {
  const [selectedVoice, setSelectedVoice] = useState(availableVoices[0]);
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [textToTest, setTextToTest] = useState("Hello, this is a test of the selected voice.");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Voice Customization</h1>
          <p className="text-muted-foreground">
            Customize and manage voices for your AI calling agents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileAudio className="h-4 w-4 mr-2" />
            My Voice Library
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Custom Voice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Selection and Testing */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Voice Configuration</CardTitle>
              <CardDescription>Select a voice and fine-tune its properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="voice-select">Base Voice</Label>
                <Select
                  value={selectedVoice.id}
                  onValueChange={id => setSelectedVoice(availableVoices.find(v => v.id === id)!)}
                >
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name} - {voice.accent} {voice.style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="pitch">Pitch ({pitch.toFixed(1)})</Label>
                  <Slider
                    id="pitch"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={[pitch]}
                    onValueChange={([val]) => setPitch(val)}
                  />
                </div>
                <div>
                  <Label htmlFor="speed">Speed ({speed.toFixed(1)}x)</Label>
                  <Slider
                    id="speed"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={[speed]}
                    onValueChange={([val]) => setSpeed(val)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="test-text">Test Audio</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="test-text"
                    value={textToTest}
                    onChange={e => setTextToTest(e.target.value)}
                    placeholder="Enter text to generate audio"
                  />
                  <Button size="icon">
                    <PlayCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Voice Upload */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Voice Cloning</CardTitle>
              <CardDescription>Create a new voice by uploading an audio sample</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border-2 border-dashed rounded-lg text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm">Drag & drop an audio file here</p>
                <p className="text-xs text-muted-foreground">MP3, WAV, FLAC (max 10MB)</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Browse File
                </Button>
              </div>
              <Input placeholder="Voice Name (e.g., 'My Custom Voice')" />
              <Button className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Start Cloning Process
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 