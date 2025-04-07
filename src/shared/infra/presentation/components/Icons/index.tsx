import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

import { default as AlertIcon } from "@/shared/infra/presentation/assets/images/alert_icon.svg";
import { default as ExperimentIcon } from "@/shared/infra/presentation/assets/images/experiment_icon.svg";
import { default as GithubIcon } from "@/shared/infra/presentation/assets/images/github_icon.svg";
import { default as HourglassIcon } from "@/shared/infra/presentation/assets/images/hourglass_icon.svg";
import { default as PlugIcon } from "@/shared/infra/presentation/assets/images/plug_icon.svg";
import { default as SmileIcon } from "@/shared/infra/presentation/assets/images/smile_icon.svg";
import { default as GearIcon } from "@/shared/infra/presentation/assets/images/gear_icon.svg";
import { default as ChevronArrowIcon } from "@/shared/infra/presentation/assets/images/chevron_arrow_icon.svg";
import { default as SearchIcon } from "@/shared/infra/presentation/assets/images/search_icon.svg";
import { default as AddPeopleIcon } from "@/shared/infra/presentation/assets/images/add_people_icon.svg";
import { default as TopDownArrowIcon } from "@/shared/infra/presentation/assets/images/top_down_arrow_icon.svg";
import { default as ThreeDotsIcon } from "@/shared/infra/presentation/assets/images/three_dots_icon.svg";
import { default as ImageIcon } from "@/shared/infra/presentation/assets/images/image_icon.svg";
import { default as UserIcon } from "@/shared/infra/presentation/assets/images/user_default_avatar.svg";
import { default as ImagePencilButtonIcon } from "@/shared/infra/presentation/assets/images/image_pencil_button_icon.svg";
import { default as ImageEyeButtonIcon } from "@/shared/infra/presentation/assets/images/image_eye_button_icon.svg";
import { default as XIcon } from "@/shared/infra/presentation/assets/images/x_icon.svg";
import { default as PencilIcon } from "@/shared/infra/presentation/assets/images/pencil_icon.svg";
import { default as LogoutIcon } from "@/shared/infra/presentation/assets/images/logout_icon.svg";

export {
  AlertIcon,
  ExperimentIcon,
  GithubIcon,
  HourglassIcon,
  PlugIcon,
  SmileIcon,
  GearIcon,
  ChevronArrowIcon,
  SearchIcon,
  AddPeopleIcon,
  TopDownArrowIcon,
  ThreeDotsIcon,
  ImageIcon,
  UserIcon,
  ImagePencilButtonIcon,
  ImageEyeButtonIcon,
  XIcon,
  PencilIcon,
  LogoutIcon,
};

export const ArrowDownIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

export const ArrowUpIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);
