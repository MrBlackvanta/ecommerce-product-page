import { installDialog } from "@/test/dialog";
import { installImageDecode } from "@/test/images";
import { installLinkClicks } from "@/test/links";
import { installMatchMedia } from "@/test/media";
import { installLargestPaint } from "@/test/paint";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vite-plus/test";

beforeEach(installDialog);
beforeEach(installImageDecode);
beforeEach(installLinkClicks);
beforeEach(() => installMatchMedia());
beforeEach(installLargestPaint);

afterEach(cleanup);
