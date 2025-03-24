import React from "react";
import {
  AlertIcon,
  ExperimentIcon,
  GithubIcon,
  HourglassIcon,
  PlugIcon,
  SmileIcon,
} from "../../components/Icons";
import Link from "next/link";
import { GITHUB_LINK } from "@/shared/infra/utils/constants";

const WorkInProgressPage = () => {
  return (
    <main className="gap flex flex-grow flex-col items-center justify-center gap-4 bg-gray-100-tk px-2 py-5 md:px-4">
      <h1 className="text-center text-xl font-bold text-gray-900-tk">
        Estamos em construção
      </h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        <SmileIcon className="[&>path]:fill-gray-700-tk" />
        <HourglassIcon className="[&>path]:fill-gray-700-tk" />
        <PlugIcon className="[&>path]:fill-gray-700-tk" />
        <AlertIcon className="[&>path]:fill-gray-700-tk" />
        <ExperimentIcon className="[&>path]:fill-gray-700-tk" />
      </div>
      <Link
        href={GITHUB_LINK}
        target="_blank"
        className="mt-2 flex flex-row flex-wrap items-center justify-center gap-1"
      >
        <GithubIcon className="[&>path]:fill-gray-700-tk" />
        <p className="text-center text-lg font-semi-bold text-gray-900-tk">
          Acompanhe nosso projeto!
        </p>
      </Link>
    </main>
  );
};

export default WorkInProgressPage;
