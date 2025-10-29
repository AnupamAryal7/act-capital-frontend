"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Folder,
  FileQuestion,
} from "lucide-react";

interface FAQCategory {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface FAQ {
  id: number;
  category_id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

interface FAQCategoryWithQuestions {
  category: FAQCategory;
  questions: FAQ[];
}

interface CategoryFormData {
  title: string;
}

interface FAQFormData {
  category_id: number | null;
  question: string;
  answer: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminFAQPage() {
  const [faqCategories, setFaqCategories] = useState<
    FAQCategoryWithQuestions[]
  >([]);
  const [allCategories, setAllCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    title: "",
  });
  const [faqForm, setFaqForm] = useState<FAQFormData>({
    category_id: null,
    question: "",
    answer: "",
  });

  // Edit states
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(
    null
  );
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // API Functions
  const fetchCategories = async (): Promise<FAQCategory[]> => {
    const response = await fetch(`${API_BASE_URL}/faq-categories/`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  };

  const fetchFAQsByCategory = async (categoryId: number): Promise<FAQ[]> => {
    const response = await fetch(
      `${API_BASE_URL}/faqs/?category_id=${categoryId}`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch FAQs for category ${categoryId}`);
    return response.json();
  };

  const createCategory = async (
    data: CategoryFormData
  ): Promise<FAQCategory> => {
    const response = await fetch(`${API_BASE_URL}/faq-categories/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create category");
    return response.json();
  };

  const updateCategory = async (
    id: number,
    data: CategoryFormData
  ): Promise<FAQCategory> => {
    const response = await fetch(`${API_BASE_URL}/faq-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update category");
    return response.json();
  };

  const deleteCategory = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/faq-categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete category");
  };

  const createFAQ = async (data: FAQFormData): Promise<FAQ> => {
    const response = await fetch(`${API_BASE_URL}/faqs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create FAQ");
    return response.json();
  };

  const updateFAQ = async (id: number, data: FAQFormData): Promise<FAQ> => {
    const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update FAQ");
    return response.json();
  };

  const deleteFAQ = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete FAQ");
  };

  // Load all data
  const loadAllData = async () => {
    try {
      setLoading(true);
      const categories = await fetchCategories();
      setAllCategories(categories);

      const categoriesWithQuestions = await Promise.all(
        categories.map(async (category) => {
          const questions = await fetchFAQsByCategory(category.id);
          return { category, questions };
        })
      );

      setFaqCategories(categoriesWithQuestions);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load FAQ data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle category operations
  const handleCategorySubmit = async () => {
    if (!categoryForm.title.trim()) {
      alert("Please enter a category title");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryForm);
      } else {
        await createCategory(categoryForm);
      }

      await loadAllData();
      setIsCategoryModalOpen(false);
      resetCategoryForm();
      alert(
        editingCategory
          ? "Category updated successfully!"
          : "Category created successfully!"
      );
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      await loadAllData();
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  // Handle FAQ operations
  const handleFAQSubmit = async () => {
    if (
      !faqForm.category_id ||
      !faqForm.question.trim() ||
      !faqForm.answer.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ.id, faqForm);
      } else {
        await createFAQ(faqForm);
      }

      await loadAllData();
      setIsFAQModalOpen(false);
      resetFAQForm();
      alert(
        editingFAQ ? "FAQ updated successfully!" : "FAQ created successfully!"
      );
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Failed to save FAQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFAQ = async (faqId: number) => {
    try {
      await deleteFAQ(faqId);
      await loadAllData();
      alert("FAQ deleted successfully!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ");
    }
  };

  // Form helpers
  const resetCategoryForm = () => {
    setCategoryForm({ title: "" });
    setEditingCategory(null);
  };

  const resetFAQForm = () => {
    setFaqForm({ category_id: null, question: "", answer: "" });
    setEditingFAQ(null);
  };

  const openCategoryModal = (category?: FAQCategory) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ title: category.title });
    } else {
      resetCategoryForm();
    }
    setIsCategoryModalOpen(true);
  };

  const openFAQModal = (faq?: FAQ, preSelectedCategoryId?: number) => {
    if (faq) {
      setEditingFAQ(faq);
      setFaqForm({
        category_id: faq.category_id,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      resetFAQForm();
      // Pre-select category if provided
      if (preSelectedCategoryId) {
        setFaqForm((prev) => ({
          ...prev,
          category_id: preSelectedCategoryId,
        }));
      }
    }
    setIsFAQModalOpen(true);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading FAQ data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>FAQ Management</CardTitle>
            <div className="flex space-x-2">
              <Dialog
                open={isCategoryModalOpen}
                onOpenChange={setIsCategoryModalOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => openCategoryModal()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory
                        ? "Edit Category"
                        : "Create New Category"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-title">Category Title *</Label>
                      <Input
                        id="category-title"
                        value={categoryForm.title}
                        onChange={(e) =>
                          setCategoryForm({ title: e.target.value })
                        }
                        placeholder="Enter category title"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCategoryModalOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCategorySubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Saving..."
                          : editingCategory
                          ? "Update"
                          : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isFAQModalOpen} onOpenChange={setIsFAQModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openFAQModal()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingFAQ ? "Edit FAQ" : "Create New FAQ"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="faq-category">Category *</Label>
                      <Select
                        value={faqForm.category_id?.toString() || ""}
                        onValueChange={(value) =>
                          setFaqForm((prev) => ({
                            ...prev,
                            category_id: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {allCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="faq-question">Question *</Label>
                      <Input
                        id="faq-question"
                        value={faqForm.question}
                        onChange={(e) =>
                          setFaqForm((prev) => ({
                            ...prev,
                            question: e.target.value,
                          }))
                        }
                        placeholder="Enter the question"
                      />
                    </div>
                    <div>
                      <Label htmlFor="faq-answer">Answer *</Label>
                      <Textarea
                        id="faq-answer"
                        value={faqForm.answer}
                        onChange={(e) =>
                          setFaqForm((prev) => ({
                            ...prev,
                            answer: e.target.value,
                          }))
                        }
                        placeholder="Enter the answer"
                        rows={5}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsFAQModalOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleFAQSubmit} disabled={isSubmitting}>
                        {isSubmitting
                          ? "Saving..."
                          : editingFAQ
                          ? "Update"
                          : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                onClick={loadAllData}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {faqCategories.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No FAQ categories found
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first category to get started
              </p>
              <Button onClick={() => openCategoryModal()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {faqCategories.map((categoryData, categoryIndex) => (
                <div key={categoryData.category.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Folder className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-primary">
                        {categoryData.category.title}
                      </h3>
                      <Badge variant="outline">
                        {categoryData.questions.length} FAQ
                        {categoryData.questions.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openCategoryModal(categoryData.category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "
                              {categoryData.category.title}"? This will also
                              delete all FAQs in this category. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteCategory(categoryData.category.id)
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {categoryData.questions.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                      <FileQuestion className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">
                        No FAQs in this category
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() =>
                          openFAQModal(undefined, categoryData.category.id)
                        }
                      >
                        Add First FAQ
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {categoryData.questions.map((faq, questionIndex) => {
                        const itemId = `${categoryIndex}-${questionIndex}`;
                        const isExpanded = expandedItems.has(itemId);

                        return (
                          <Card key={faq.id} className="border">
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => toggleExpanded(itemId)}
                                  className="flex items-center space-x-2 text-left flex-1 hover:text-primary transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                  <h4 className="text-base font-medium">
                                    {faq.question}
                                  </h4>
                                </button>
                                <div className="flex items-center space-x-2 ml-4">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openFAQModal(faq)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Delete FAQ
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete this
                                          FAQ? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeleteFAQ(faq.id)
                                          }
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="mt-3 pl-6 pt-3 border-t bg-muted/20 -mx-4 -mb-4 px-4 pb-4">
                                  <p className="text-muted-foreground whitespace-pre-line">
                                    {faq.answer}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
