import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import dbService from "../../Appwrite/dbService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.authSlice.userData);
  const submit = async (data) => {
    setError('')
    setIsLoading(true)
    if (post) {
      const file = data.image[0] ? dbService.uploadFile(data.image[0]) : null;

      if (file) {
        dbService.deleteFile(post.featureImage);
      }else {
        setError('Image Upload Failed')
        setIsLoading(false)
      }

      const updatePost = await dbService.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      });

      if (updatePost) {
        navigate(`/post/${updatePost.$id}`);
      }else {
        setError("Can't Save the Post")
        setIsLoading(false)
      }
    } else {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featureImage = fileId;
        const createPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (createPost) {
          navigate(`/post/${createPost.$id}`);
        }else {
          setError("Can't Save the Post")
          setIsLoading(false)
        }
      }else {
        setError('Image Upload Failed')
        setIsLoading(false)
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-")
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
      <p className="text-red-500 mx-auto w-full font-bold text-1xl">{error}</p>
        <Input
          label="Title :"
          placeholder="Title"
          classnames="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          classnames="mb-4"
          value={slugTransform(getValues("title"))}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          classnames="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full my-4">
            <img
              src={dbService.getFilePreview(post.featureImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          classnames="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          classnames="w-full"
          bgColor={post ? "bg-green-500" : undefined}
          isLoading={isLoading}
          LoadingText={post ? "Updating..." : "Submitting..."}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
