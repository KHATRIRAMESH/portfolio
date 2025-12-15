"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";
import { CldUploadWidget } from 'next-cloudinary';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const Container = styled.div`
  min-height: 100vh;
  background: #0F1624;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background: #0F1624;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #9cc9e3;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  background: #1a1a2e;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 2px solid #444;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #9cc9e3;
  }

  &::placeholder {
    color: #666;
  }
`;

const FileInputWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px dashed #444;
  padding: 1rem;
  border-radius: 8px;
`;

const EditorWrapper = styled.div`
  height: 300px;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 2px solid #444;
  border-radius: 8px;
  background: #1a1a2e;

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #444;
  }

  .ql-container {
    border: none;
    font-size: 16px;
  }

  .ql-editor {
    min-height: 200px;
    color: #fff;
  }

  .ql-editor.ql-blank::before {
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();

    const editorRef = useRef(null);
    const quillInstanceRef = useRef(null);

    useEffect(() => {
        const initQuill = async () => {
            if (editorRef.current && !quillInstanceRef.current) {
                const Quill = (await import('quill')).default;

                const quill = new Quill(editorRef.current, {
                    theme: "snow",
                    placeholder: "Write something interesting...",
                    modules: {
                        toolbar: [
                            [{ 'header': [2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'blockquote', 'code-block'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ]
                    }
                });

                quill.on("text-change", () => {
                    setContent(quill.root.innerHTML);
                });

                quillInstanceRef.current = quill;
            }
        };

        initQuill();

        return () => {
            if (quillInstanceRef.current) {
                quillInstanceRef.current = null;
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please upload a featured image", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');

            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    image
                })
            });

            if (res.status === 201) {
                toast.success("Blog created successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                });

                setTimeout(() => {
                    router.push("/blogs");
                }, 2000);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create blog", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleBack = () => {
        router.push("/blogs");
    };

    return (
        <Container>
            <FormWrapper>
                <ToastContainer />
                <Title>Create a New Blog Post</Title>

                <Form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="title" className="text-lg">
                            Post Title:
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Enter post title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="category" className="text-lg">
                            Category:
                        </Label>
                        <Input
                            type="text"
                            id="category"
                            placeholder="e.g., Technology, Travel, etc."
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="file-upload" className="text-lg">
                            Featured Image:
                        </Label>
                        <CldUploadWidget
                            uploadPreset="next-cloudinary-signed"
                            signatureEndpoint="/api/sign-cloudinary-params"
                            onSuccess={(result) => {
                                if (result?.info && typeof result.info !== 'string') {
                                    setImage(result.info.secure_url);
                                    toast.success('Image uploaded successfully!', {
                                        position: "top-right",
                                        autoClose: 2000,
                                    });
                                }
                            }}
                            onError={(error) => {
                                console.error('Upload error:', error);
                                toast.error('Image upload failed', {
                                    position: "top-right",
                                    autoClose: 3000,
                                });
                            }}
                        >
                            {({ open }) => (
                                <Button type="button" onClick={() => open()}>
                                    {image ? 'Change Featured Image' : 'Upload Featured Image'}
                                </Button>
                            )}
                        </CldUploadWidget>
                        {image && (
                            <Input
                                type="text"
                                placeholder="Image URL (uploaded)"
                                value={image}
                                readOnly
                                style={{ marginTop: '8px' }}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="content" className="text-lg">
                            Post Content:
                        </Label>
                        <EditorWrapper>
                            <div ref={editorRef}></div>
                        </EditorWrapper>
                    </div>

                    <ButtonGroup>
                        <Button
                            type="submit"
                            className="bg-green-500 text-white"
                        >
                            Publish Blog
                        </Button>
                        <Button
                            type="button"
                            onClick={handleBack}
                            className="bg-red-600 text-white"
                        >
                            Back to Blogs
                        </Button>
                    </ButtonGroup>
                </Form>
            </FormWrapper>
        </Container>
    );
};

export default CreatePost;
