import type { ReactNode } from "react";
import type { ExternalToast } from "sonner";
import { toast } from "sonner";

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

/**
 * Enum representing the possible types of Toast that this Builder support
 */
enum ToastType {
  Default = "Default",
  Success = "Success",
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}

/**
 * Class representing the logic to create and send a Toast
 * Example use: ToastBuilder.success("I love ben").withDesc("My love for ben knows no bounds").send()
 */
class ToastBuilder {
  /**
   * Type of toast
   */
  type: ToastType;

  /**
   * Title of the toast
   */
  title: string;

  /**
   * Additional data to customize toast generated
   */
  data: ExternalToast = {};

  private constructor(type: ToastType, title: string) {
    this.type = type;
    this.title = title;
  }

  /**
   * Generates a default toast, able to use with all other with - extensions
   */
  public static default(withTitle: string): ToastBuilder {
    return new ToastBuilder(ToastType.Default, withTitle);
  }

  /**
   * Generates a default success toast, able to use with all other with - extensions
   */
  public static success(withTitle: string): ToastBuilder {
    return new ToastBuilder(ToastType.Success, withTitle);
  }

  /**
   * Generates a default error toast, able to use with all other with - extensions
   */
  public static error(withTitle: string): ToastBuilder {
    return new ToastBuilder(ToastType.Error, withTitle);
  }

  /**
   * Generates a default info toast, Unable to be used with withStyle and withIcon
   * as they will be overwritten
   * @see withStyle
   * @see withIcon
   */
  public static info(withTitle: string): ToastBuilder {
    return new ToastBuilder(ToastType.Info, withTitle);
  }

  /**
   * Generates a default warning toast, Unable to be used with withStyle and withIcon
   * as they will be overwritten
   * @see withStyle
   * @see withIcon
   */
  public static warning(withTitle: string): ToastBuilder {
    return new ToastBuilder(ToastType.Warning, withTitle);
  }

  /**
   * Adds a description below the title, able to be used with all others
   * @param desc The description of the toast
   * @returns This instance
   */
  public withDesc(desc: string): ToastBuilder {
    this.data.description = desc;
    return this;
  }

  /**
   * Adds a duration to the toast, able to be used with all others
   * @param duration The duration in milliseconds
   * @returns This instance
   */
  public withDuration(duration: number): ToastBuilder {
    this.data.duration = duration;
    return this;
  }

  /**
   * Adds custom icon to the toast, unable to be used with info and warning types,
   * as the styles will be overwritten
   * @param icon The icon to be added/changed
   * @returns This instance
   */
  public withIcon(icon: ReactNode): ToastBuilder {
    this.data.icon = icon;
    return this;
  }

  /**
   * Sends the current toast to the UI
   * @returns void
   */
  public send(): void {
    switch (this.type) {
      case ToastType.Default:
        toast(this.title, this.data);
        return;
      case ToastType.Success:
        toast.success(this.title, this.data);
        return;
      case ToastType.Info:
        this.data.icon = (
          <InformationCircleIcon className="h-[20px] w-[20px]" />
        );
        this.data.style = {
          color: "hsl(210, 92%, 45%)",
          backgroundColor: "hsl(208, 100%, 97%)",
          borderColor: "hsl(221, 91%, 91%)",
        };
        toast(this.title, this.data);
        return;
      case ToastType.Warning:
        this.data.icon = (
          <ExclamationTriangleIcon className="h-[20px] w-[20px]" />
        );
        this.data.style = {
          color: "hsl(31, 92%, 45%)",
          backgroundColor: "hsl(49, 100%, 97%)",
          borderColor: "hsl(49, 91%, 91%)",
        };
        toast(this.title, this.data);
        return;
      case ToastType.Error:
        toast.error(this.title, this.data);
        return;
      default:
        throw new Error("Should not reach here");
    }
  }
}

export default ToastBuilder;
