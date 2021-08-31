import clsx from "clsx";
import React from "react";
import Image from "next/image";

export interface FeatureProps {
  title: string;
  description: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  imageSrc: string;
  flipSide?: boolean;
}

export const Feature: React.FC<FeatureProps> = (props) => {
  const { title, description, Icon, imageSrc, flipSide } = props;

  return (
    <section
      className={clsx("grid grid-cols-1 sm:grid-cols-2 mt-16 items-center")}
    >
      <div
        className={clsx("", flipSide ? "sm:col-start-2 sm:row-start-1" : "")}
      >
        <div className={"flex items-center"}>
          <div className={"rounded-lg bg-green-600 text-white p-2"}>
            <Icon className={"w-6 h-6"} />
          </div>
          <h4 className={"text-2xl ml-2 tracking-tight"}>{title}</h4>
        </div>
        <p className={"text-gray-700 mt-4 text-lg"}>{description}</p>
      </div>
      <div
        className={
          flipSide ? "sm:col-start-1 sm:row-start-1 sm:pr-12" : "sm:pl-12"
        }
      >
        <img
          className={clsx(
            "w-full mt-4 sm:mt-0 border-2 rounded-lg overflow-hidden"
          )}
          src={imageSrc}
          alt={title}
        />
      </div>
    </section>
  );
};
