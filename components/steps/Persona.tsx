"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import callApi from "@/config/axios/axios";
import { toast } from "@/hooks/use-toast";

interface PersonaData {
  name: string;
  age: string;
  gender: string;
  residence: string;
  lifestyle: string;
  target_issue: string[]; // comma-separated or multi-line
  product_solve: string[]; // comma-separated or multi-line
  other_points: string[]; // comma-separated or multi-line
}

interface PersonaProps {
  formData: any;
  onSave: (data: PersonaData) => void;
  onPersonaReady: (result: any) => void;
}

export function Persona({ formData, onSave, onPersonaReady }: PersonaProps) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<PersonaData>({} as PersonaData);
  const [loading, setLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const payload = { input: formData };

  const callingAPI = async () => {
    let attempts = 0;
    let success = false;
    let lastError = "";
    setError(null);
    while (attempts < 3 && !success) {
      try {
        setLoading(true);
        const response = await callApi.post("/persona", payload);
        console.log("ini response : ", response.data);
        if (response.data && response.data.success) {
          const { persona, insight } = response.data.data;
          setForm({
            ...persona,
            target_issue: insight.target_issue,
            product_solve: insight.product_solve,
            other_points: insight.other_points,
          });
          setLoading(false);

          onPersonaReady(response.data.data);

          success = true;
        } else {
          throw new Error(response.data?.error || "Unknown error");
        }
      } catch (err: any) {
        console.log("ini err : ", err);
        attempts++;
        lastError = err?.message || "Unknown error";
        if (attempts >= 3) {
          setError("Failed to load persona data. " + lastError);
          setLoading(false);
        }
      }
    }
  };

  // API call on mount or when formData changes
  useEffect(() => {
    setForm({} as PersonaData);
    setDotCount(1);

    callingAPI();
  }, []);

  // Animated loading effect
  useEffect(() => {
    if (loading) {
      setDotCount(1);
      const dotInterval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 400);
      return () => clearInterval(dotInterval);
    }
  }, [loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setForm((prev) => ({ ...prev, gender: value }));
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    onSave(form);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]  rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#433D8B] border-t-transparent rounded-full animate-spin" />
          <div className="text-lg text-[#433D8B] font-semibold">
            Please wait while we are generating your persona result
            {".".repeat(dotCount)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] rounded-2xl">
        <div className="text-lg text-[#433D8B] font-semibold mb-2">{error}</div>
        <Button onClick={callingAPI} className="bg-[#2E236C] text-white mt-2">Retry</Button>
      </div>
    );
  }

  return (
    <motion.div className="space-y-6">
      <div className="flex justify-end mb-2">
        {!editMode ? (
          <Button variant="outline" onClick={handleEdit} size="sm">
            Edit
          </Button>
        ) : (
          <Button onClick={handleSave} size="sm" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        )}
      </div>
      {/* Persona Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="space-y-2">
          <Label htmlFor="name">Persona Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Persona Name"
            disabled={!editMode}
          />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="age">Persona Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={form.age || ""}
            onChange={handleChange}
            placeholder="Persona Age"
            disabled={!editMode}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Persona Gender</Label>
          <Select
            value={form.gender}
            onValueChange={handleGenderChange}
            disabled={!editMode}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="男性">男性</SelectItem>
              <SelectItem value="女性">"女性"</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="residence">Residence</Label>
          <Input
            id="residence"
            name="residence"
            value={form.residence || ""}
            onChange={handleChange}
            placeholder="e.g. Tokyo"
            disabled={!editMode}
          />
        </div> */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="lifestyle">Lifestyle</Label>
          <Input
            id="lifestyle"
            name="lifestyle"
            value={form.lifestyle || ""}
            onChange={handleChange}
            placeholder="e.g. Natural-minded office worker"
            disabled={!editMode}
          />
        </div>
      </div>
      {/* Insight Section */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="space-y-2 w-full">
          <Label htmlFor="target_issue">Target Issues</Label>
          <Textarea
            id="target_issue"
            name="target_issue"
            value={form.target_issue || ""}
            onChange={handleChange}
            placeholder="e.g. Dryness, Dullness, Pores"
            disabled={!editMode}
            rows={3}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="product_solve">Product Solve</Label>
          <Textarea
            id="product_solve"
            name="product_solve"
            value={form.product_solve || ""}
            onChange={handleChange}
            placeholder="e.g. Vitamin C for clarity, Suitable for sensitive skin, Affordable"
            disabled={!editMode}
            rows={3}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="other_points">Other Points</Label>
          <Textarea
            id="other_points"
            name="other_points"
            value={form.other_points || ""}
            onChange={handleChange}
            placeholder="e.g. Pleasant scent, Light texture, Cute packaging"
            disabled={!editMode}
            rows={3}
          />
        </div>
      </div>
    </motion.div>
  );
}
