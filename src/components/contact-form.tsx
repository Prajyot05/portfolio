"use client";
import { KeyTextField } from "@prismicio/client";
import React, { useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { gsap } from "gsap";
import { Vortex } from "./ui/vortex";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm({ heading }: { heading: KeyTextField }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (params: Record<string, string>) => {
    const toastId = toast.loading("Sending your message, please wait...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        params,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
          limitRate: {
            throttle: 5000, // Can only send the next email after 5 seconds
          },
        }
      )
      .then(
        () => {
          toast.success(
            "I have received your message, I will get back to you soon!",
            {
              id: toastId,
            }
          );
        },
        () => {
          toast.error(
            "There was an error sending your message, please try again later!",
            {
              id: toastId,
            }
          );
        }
      );
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const templateParams = {
      to_name: "Prajyot Tayde",
      from_name: data.name,
      reply_to: data.email,
      subject: data.subject,
      message: data.message,
    };

    sendEmail(templateParams);
  };

  useEffect(() => {
    if (formRef.current) {
      const elements = gsap.utils.toArray<HTMLElement>(
        formRef.current.querySelectorAll("input, textarea, button, h2")
      );

      gsap.from(elements, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }
  }, []);

  return (
    // <Vortex backgroundColor="transparent" className="flex justify-center">
    <Vortex
      backgroundColor="transparent"
      rangeY={200}
      particleCount={500}
      baseHue={120}
      className="flex justify-center"
    >
      <Toaster richColors />
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full bg-black/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-white/50 shadow-sm space-y-6"
      >
        <h2 className="text-4xl font-semibold text-slate-100 text-center">
          {heading}
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          {...register("name", {
            required: "This field is required!",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long.",
            },
          })}
          className="w-full px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Your Email"
          {...register("email", {
            required: "This field is required!",
          })}
          className="w-full px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}

        <input
          type="text"
          placeholder="Subject"
          {...register("subject", {
            required: "This field is required!",
            minLength: {
              value: 5,
              message: "Subject should be at least 5 characters long.",
            },
          })}
          className="w-full px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        {errors.subject && (
          <p className="text-sm text-red-400">{errors.subject.message}</p>
        )}

        <textarea
          placeholder="Your Message"
          {...register("message", {
            required: "This field is required!",
            maxLength: {
              value: 500,
              message: "Message should be less than 500 characters",
            },
            minLength: {
              value: 50,
              message: "Message should be more than 50 characters",
            },
          })}
          className="w-full h-32 px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}

        <button
          type="submit"
          className="cursor-pointer w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded-lg shadow-md font-medium tracking-wide uppercase"
        >
          Cast your message!
        </button>
      </form>
    </Vortex>
  );
}
