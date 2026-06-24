import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

type OrbState = "idle" | "listening" | "thinking";

// ─── Icon Components ──────────────────────────────────────────────────────────

function IconMeetingSummary({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 1.66667H5C4.558 1.66667 4.134 1.84227 3.821 2.15483C3.509 2.46739 3.333 2.89131 3.333 3.33334V16.6667C3.333 17.1087 3.509 17.5326 3.821 17.8452C4.134 18.1577 4.558 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.178 17.8452C16.491 17.5326 16.667 17.1087 16.667 16.6667V5.83334L12.5 1.66667Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11.667 1.66667V5.00001C11.667 5.44203 11.842 5.86596 12.155 6.17852C12.467 6.49108 12.891 6.66667 13.333 6.66667H16.667"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M8.333 7.5H6.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.333 10.8333H6.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.333 14.1667H6.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLiveNotes() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.417 18.3333H15C15.442 18.3333 15.866 18.1577 16.178 17.8452C16.491 17.5326 16.667 17.1087 16.667 16.6667V5.83334L12.5 1.66667H5C4.558 1.66667 4.134 1.84227 3.821 2.15483C3.509 2.46739 3.333 2.89131 3.333 3.33334V11.25"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11.667 1.66667V5.00001C11.667 5.44203 11.842 5.86596 12.155 6.17852C12.467 6.49108 12.891 6.66667 13.333 6.66667H16.667"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11.148 13.0217C11.313 12.8573 11.443 12.6622 11.532 12.4474C11.621 12.2326 11.667 12.0025 11.667 11.77C11.667 11.5375 11.621 11.3074 11.532 11.0926C11.443 10.8778 11.313 10.6827 11.148 10.5183C10.984 10.354 10.789 10.2236 10.574 10.1346C10.359 10.0457 10.129 9.99988 9.897 9.99988C9.664 9.99988 9.434 10.0457 9.219 10.1346C9.005 10.2236 8.809 10.354 8.645 10.5183L4.47 14.695C4.272 14.893 4.127 15.1378 4.048 15.4067L3.351 17.7983C3.33 17.87 3.329 17.9461 3.347 18.0184C3.366 18.0908 3.403 18.1568 3.456 18.2096C3.509 18.2624 3.575 18.3001 3.647 18.3186C3.72 18.3372 3.796 18.3359 3.868 18.315L6.259 17.6175C6.528 17.539 6.773 17.394 6.971 17.1958L11.148 13.0217Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconActionItems() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.5 8.75V15.8333C17.5 16.2754 17.324 16.6993 17.012 17.0118C16.699 17.3244 16.275 17.5 15.833 17.5H4.167C3.725 17.5 3.301 17.3244 2.988 17.0118C2.676 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.676 3.30072 2.988 2.98816C3.301 2.67559 3.725 2.5 4.167 2.5H14.583"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M7.5 9.16666L10 11.6667L18.333 3.33333"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTranslation() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 6.66666L9.167 11.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.333 11.6667L8.333 6.66666L10 4.16666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.667 4.16666H11.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.833 1.66666H6.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.333 18.3333L14.167 10L10 18.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.667 15H16.667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearchMemory() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M9.167 15.8333C12.849 15.8333 15.833 12.8486 15.833 9.16667C15.833 5.48477 12.849 2.5 9.167 2.5C5.485 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.485 15.8333 9.167 15.8333Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M17.5 17.5L13.917 13.9167" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.183 1.66666H9.817C9.375 1.66666 8.951 1.84225 8.638 2.15481C8.326 2.46737 8.15 2.8913 8.15 3.33332V3.48332C8.15 3.77559 8.073 4.06265 7.926 4.31569C7.78 4.56873 7.57 4.77885 7.317 4.92499L6.958 5.13332C6.705 5.2796 6.418 5.35661 6.125 5.35661C5.832 5.35661 5.545 5.2796 5.292 5.13332L5.167 5.06666C4.784 4.84604 4.33 4.78619 3.903 4.90025C3.477 5.0143 3.113 5.29294 2.892 5.67499L2.708 5.99166C2.488 6.3741 2.428 6.82846 2.542 7.25499C2.656 7.68152 2.935 8.04536 3.317 8.26666L3.442 8.34999C3.694 8.49542 3.903 8.70423 4.049 8.95568C4.195 9.20713 4.273 9.49247 4.275 9.78332V10.2083C4.276 10.502 4.2 10.7908 4.053 11.0454C3.907 11.3 3.696 11.5115 3.442 11.6583L3.317 11.7333C2.935 11.9546 2.656 12.3185 2.542 12.745C2.428 13.1715 2.488 13.6259 2.708 14.0083L2.892 14.325C3.113 14.707 3.477 14.9857 3.903 15.0997C4.33 15.2138 4.784 15.1539 5.167 14.9333L5.292 14.8667C5.545 14.7204 5.832 14.6434 6.125 14.6434C6.418 14.6434 6.705 14.7204 6.958 14.8667L7.317 15.075C7.57 15.2211 7.78 15.4313 7.926 15.6843C8.073 15.9373 8.15 16.2244 8.15 16.5167V16.6667C8.15 17.1087 8.326 17.5326 8.638 17.8452C8.951 18.1577 9.375 18.3333 9.817 18.3333H10.183C10.625 18.3333 11.049 18.1577 11.362 17.8452C11.674 17.5326 11.85 17.1087 11.85 16.6667V16.5167C11.85 16.2244 11.928 15.9373 12.074 15.6843C12.22 15.4313 12.43 15.2211 12.683 15.075L13.042 14.8667C13.295 14.7204 13.582 14.6434 13.875 14.6434C14.168 14.6434 14.455 14.7204 14.708 14.8667L14.833 14.9333C15.216 15.1539 15.67 15.2138 16.097 15.0997C16.523 14.9857 16.887 14.707 17.108 14.325L17.292 14C17.512 13.6175 17.572 13.1632 17.458 12.7367C17.344 12.3101 17.065 11.9463 16.683 11.725L16.558 11.6583C16.304 11.5115 16.093 11.3 15.947 11.0454C15.8 10.7908 15.724 10.502 15.725 10.2083V9.79166C15.724 9.49797 15.8 9.2092 15.947 8.95457C16.093 8.69994 16.304 8.4885 16.558 8.34166L16.683 8.26666C17.065 8.04536 17.344 7.68152 17.458 7.25499C17.572 6.82846 17.512 6.3741 17.292 5.99166L17.108 5.67499C16.887 5.29294 16.523 5.0143 16.097 4.90025C15.67 4.78619 15.216 4.84604 14.833 5.06666L14.708 5.13332C14.455 5.2796 14.168 5.35661 13.875 5.35661C13.582 5.35661 13.295 5.2796 13.042 5.13332L12.683 4.92499C12.43 4.77885 12.22 4.56873 12.074 4.31569C11.928 4.06265 11.85 3.77559 11.85 3.48332V3.33332C11.85 2.8913 11.674 2.46737 11.362 2.15481C11.049 1.84225 10.625 1.66666 10.183 1.66666Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M10 12.5C11.381 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.381 7.5 10 7.5C8.619 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.619 12.5 10 12.5Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.66669C9.337 1.66669 8.701 1.93008 8.232 2.39892C7.763 2.86776 7.5 3.50365 7.5 4.16669V10C7.5 10.6631 7.763 11.2989 8.232 11.7678C8.701 12.2366 9.337 12.5 10 12.5C10.663 12.5 11.299 12.2366 11.768 11.7678C12.237 11.2989 12.5 10.6631 12.5 10V4.16669C12.5 3.50365 12.237 2.86776 11.768 2.39892C11.299 1.93008 10.663 1.66669 10 1.66669Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M15.833 8.33331V9.99998C15.833 11.5471 15.219 13.0308 14.125 14.1248C13.031 15.2187 11.547 15.8333 10 15.8333C8.453 15.8333 6.969 15.2187 5.875 14.1248C4.781 13.0308 4.167 11.5471 4.167 9.99998V8.33331"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M10 15.8333V18.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.333 10.8333L17.686 13.735C17.749 13.7768 17.822 13.8007 17.897 13.8043C17.972 13.8079 18.047 13.791 18.113 13.7554C18.18 13.7199 18.235 13.6669 18.274 13.6023C18.313 13.5376 18.333 13.4637 18.333 13.3883V6.55833C18.333 6.48502 18.314 6.41299 18.277 6.34954C18.241 6.28608 18.188 6.23343 18.124 6.19691C18.061 6.16039 17.989 6.14129 17.915 6.14154C17.842 6.14179 17.77 6.16138 17.707 6.19833L13.333 8.75"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11.667 5H3.333C2.412 5 1.667 5.74619 1.667 6.66667V13.3333C1.667 14.2538 2.412 15 3.333 15H11.667C12.587 15 13.333 14.2538 13.333 13.3333V6.66667C13.333 5.74619 12.587 5 11.667 5Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconScreen() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M16.667 2.5H3.333C2.412 2.5 1.667 3.24619 1.667 4.16667V12.5C1.667 13.4205 2.412 14.1667 3.333 14.1667H16.667C17.587 14.1667 18.333 13.4205 18.333 12.5V4.16667C18.333 3.24619 17.587 2.5 16.667 2.5Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M6.667 17.5H13.333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14.1667V17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAskAI() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.5 12.5C17.5 12.942 17.324 13.366 17.012 13.6785C16.699 13.9911 16.275 14.1667 15.833 14.1667H5.833L2.5 17.5V4.16667C2.5 3.72464 2.676 3.30072 2.988 2.98816C3.301 2.67559 3.725 2.5 4.167 2.5H15.833C16.275 2.5 16.699 2.67559 17.012 2.98816C17.324 3.30072 17.5 3.72464 17.5 4.16667V12.5Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTranslate() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.833 4.16669H4.167C3.246 4.16669 2.5 4.91288 2.5 5.83335V14.1667C2.5 15.0872 3.246 15.8334 4.167 15.8334H15.833C16.754 15.8334 17.5 15.0872 17.5 14.1667V5.83335C17.5 4.91288 16.754 4.16669 15.833 4.16669Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M5.833 12.5H9.167M12.5 12.5H14.167M5.833 9.16669H7.5M10.833 9.16669H14.167"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRecord() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 18.3334C14.602 18.3334 18.333 14.6024 18.333 10C18.333 5.39765 14.602 1.66669 10 1.66669C5.398 1.66669 1.667 5.39765 1.667 10C1.667 14.6024 5.398 18.3334 10 18.3334Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 16.6667H10.008" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.667 7.35C3.958 5.30018 6.925 4.16695 10 4.16695C13.075 4.16695 16.042 5.30018 18.333 7.35" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.167 10.7158C5.724 9.18895 7.819 8.33369 10 8.33369C12.181 8.33369 14.276 9.18895 15.833 10.7158" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.083 13.6908C7.862 12.9274 8.909 12.4998 10 12.4998C11.091 12.4998 12.138 12.9274 12.917 13.6908" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.333 5.83334H3.333C2.412 5.83334 1.667 6.57953 1.667 7.5V12.5C1.667 13.4205 2.412 14.1667 3.333 14.1667H13.333C14.254 14.1667 15 13.4205 15 12.5V7.5C15 6.57953 14.254 5.83334 13.333 5.83334Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M18.333 9.16666V10.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M8.557 17.5C8.703 17.7533 8.913 17.9637 9.167 18.11C9.42 18.2563 9.707 18.3333 10 18.3333C10.293 18.3333 10.58 18.2563 10.833 18.11C11.087 17.9637 11.297 17.7533 11.443 17.5"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M2.718 12.7717C2.609 12.891 2.538 13.0394 2.512 13.1988C2.485 13.3582 2.506 13.5217 2.571 13.6695C2.637 13.8173 2.743 13.943 2.879 14.0312C3.014 14.1195 3.172 14.1665 3.333 14.1667H16.667C16.828 14.1667 16.986 14.1199 17.122 14.0318C17.257 13.9437 17.364 13.8181 17.429 13.6704C17.494 13.5227 17.515 13.3592 17.49 13.1998C17.464 13.0404 17.392 12.892 17.283 12.7725C16.175 11.63 15 10.4158 15 6.66667C15 5.34059 14.473 4.06882 13.536 3.13113C12.598 2.19345 11.326 1.66667 10 1.66667C8.674 1.66667 7.402 2.19345 6.464 3.13113C5.527 4.06882 5 5.34059 5 6.66667C5 10.4158 3.824 11.63 2.718 12.7717Z"
        stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M12.667 14V12.6667C12.667 11.9594 12.386 11.2811 11.886 10.781C11.386 10.281 10.707 10 10 10H6C5.293 10 4.615 10.281 4.114 10.781C3.614 11.2811 3.333 11.9594 3.333 12.6667V14"
        stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M8 7.33333C9.473 7.33333 10.667 6.13943 10.667 4.66667C10.667 3.19391 9.473 2 8 2C6.527 2 5.333 3.19391 5.333 4.66667C5.333 6.13943 6.527 7.33333 8 7.33333Z"
        stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "meeting-summary", label: "Meeting Summary", icon: IconMeetingSummary },
  { id: "live-notes", label: "Live Notes", icon: IconLiveNotes },
  { id: "action-items", label: "Action Items", icon: IconActionItems },
  { id: "translation", label: "Translation", icon: IconTranslation },
  { id: "search-memory", label: "Search Memory", icon: IconSearchMemory },
  { id: "settings", label: "Settings", icon: IconSettings },
];

// ─── Insight Cards ────────────────────────────────────────────────────────

const INSIGHTS = [
  { label: "Key Decisions", value: "3 detected", highlight: true },
  { label: "Action Items", value: "5 pending", highlight: false },
  { label: "Current Topic", value: "Product roadmap", highlight: false },
  { label: "Confidence", value: "94%", highlight: true },
];

// ─── Timeline Segments ────────────────────────────────────────────────────

const TIMELINE = [
  { label: "Intro", color: "#06B6D4", opacity: 1 },
  { label: "Architecture Discussion", color: "#8B5CF6", opacity: 1 },
  { label: "Roadmap Goals", color: "#EC4899", opacity: 0.6 },
  { label: "Budget Review", color: "#F59E0B", opacity: 0.6 },
];

// ─── Controls ─────────────────────────────────────────────────────────────

const CONTROLS = [
  { id: "mic", label: "Mic", icon: IconMic, active: false },
  { id: "camera", label: "Camera", icon: IconCamera, active: false },
  { id: "screen", label: "Screen", icon: IconScreen, active: false },
  { id: "ask-ai", label: "Ask AI", icon: IconAskAI, active: true },
  { id: "translate", label: "Translate", icon: IconTranslate, active: false },
  { id: "record", label: "Record", icon: IconRecord, active: false },
];

const DEFAULT_NOTES = `Meeting focused on product roadmap, architecture discussion, and budget review.

Key notes:
- Team reviewed current product roadmap.
- Architecture discussion focused on edge network reliability.
- Budget review is still pending final approval.`;

const MOCK_GENERATED_SUMMARY = `Astra Meeting Summary

The meeting covered the product roadmap, architecture direction, and budget planning. The main decision was to continue prioritizing dashboard reliability and low-latency assistant responses.

Key decisions:
- Continue with the current dashboard-first UI direction.
- Prioritize local responsiveness before backend integration.
- Keep Raspberry Pi display testing as a future hardware target.

Action items:
- Test the deployed Netlify build on multiple screen sizes.
- Prepare a Raspberry Pi 5 kiosk-mode test.
- Replace mock assistant behavior with real services later.`;

function readStoredString(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

function readStoredStringArray(key: string, fallback: string[]) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getOrbStateForControls(activeControls: string[]): OrbState {
  return activeControls.includes("mic") || activeControls.includes("record")
    ? "listening"
    : "idle";
}

// ─── Orb Particles ────────────────────────────────────────────────────────

const PARTICLES = [
  { id: 1, angle: 0, distance: 140 },
  { id: 2, angle: 45, distance: 130 },
  { id: 3, angle: 90, distance: 150 },
  { id: 4, angle: 135, distance: 120 },
  { id: 5, angle: 180, distance: 145 },
  { id: 6, angle: 225, distance: 125 },
  { id: 7, angle: 270, distance: 155 },
  { id: 8, angle: 315, distance: 135 },
];

// ─── OrbParticle Component ────────────────────────────────────────────────

function OrbParticle({
  angle,
  distance,
  orbState,
}: {
  angle: number;
  distance: number;
  orbState: OrbState;
}) {
  // Determine opacity and animation speed based on orb state
  let opacityClass = "opacity-60";
  let duration = 12;

  if (orbState === "listening") {
    opacityClass = "opacity-80";
    duration = 8;
  } else if (orbState === "thinking") {
    opacityClass = "opacity-100";
    duration = 5;
  }

  // Create a proper orbital container that rotates, with the particle positioned inside
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        width: "100%",
        height: "100%",
        marginLeft: "-50%",
        marginTop: "-50%",
        animation: `particle-orbit ${duration}s linear infinite`,
        transformOrigin: "center center",
      }}
    >
      {/* Particle positioned at the initial angle and distance */}
      <div
        className={cn("absolute w-2 h-2 rounded-full bg-[#53EAFD]", opacityClass)}
        style={{
          left: "50%",
          top: "50%",
          width: "8px",
          height: "8px",
          marginLeft: "-4px",
          marginTop: "-4px",
          boxShadow: "0 0 8px rgba(83, 234, 253, 0.6)",
          // Position at the calculated orbital position
          transform: `rotate(${angle}deg) translateX(${distance}px)`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}

// ─── Main Orb Component ───────────────────────────────────────────────────

function AstraOrb({
  orbState,
  onClick,
}: {
  orbState: OrbState;
  onClick: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement>(null);

  const isIdle = orbState === "idle";
  const isListening = orbState === "listening";
  const isThinking = orbState === "thinking";

  // Determine glow intensity (reduced) and animation based on state
  let glowColor = "rgba(57, 170, 218, 0.25)";
  let glowColorSecond = "rgba(127, 34, 254, 0.08)";
  let pulseAnimation = "orb-sphere-pulse 3s ease-in-out infinite";

  if (isListening) {
    glowColor = "rgba(57, 170, 218, 0.4)";
    glowColorSecond = "rgba(127, 34, 254, 0.15)";
    pulseAnimation = "orb-sphere-pulse 1.5s ease-in-out infinite";
  } else if (isThinking) {
    glowColor = "rgba(57, 170, 218, 0.55)";
    glowColorSecond = "rgba(127, 34, 254, 0.25)";
    pulseAnimation = "orb-sphere-pulse 0.8s ease-in-out infinite";
  }

  // Handle mouse movement for orb following effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;

    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Limit the follow distance to 20px max
    const maxDistance = 20;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const ratio = Math.min(maxDistance / distance, 1);

    setMousePos({
      x: (distX * ratio) / 4, // Reduced movement for subtle effect
      y: (distY * ratio) / 4,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={orbRef}
      className="relative flex shrink-0 aspect-square items-center justify-center w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s ease-out",
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
      }}
    >
      
      {/* Centered dual-color aura attached to the orb */}
      <div
        className="absolute inset-[-22%] rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 35% 55%, rgba(0,184,219,0.22) 0%, transparent 38%),
            radial-gradient(circle at 68% 58%, rgba(142,81,255,0.22) 0%, transparent 42%)
          `,
          filter: "blur(42px)",
          animation: "orb-blur-breathe 6s ease-in-out infinite",
        }}
      />

      {/* Blurred background glow */}
      <div
        className="absolute inset-0 rounded-full orb-blur-breathe"
        style={{
          background: "radial-gradient(circle, rgba(0,184,219,0.2) 0%, rgba(142,81,255,0.15) 50%, rgba(225,42,251,0.1) 100%)",
          filter: "blur(64px)",
        }}
      />

      {/* Outer rotating ring */}
      <div
        className="absolute rounded-full border border-[rgba(0,211,243,0.2)] ring-spin-cw"
        style={{ width: "112%", height: "112%" }}
      />

      {/* Inner counter-rotating ring */}
      <div
        className="absolute rounded-full border border-[rgba(166,132,255,0.2)] ring-spin-ccw"
        style={{ width: "90%", height: "90%" }}
      />

      {/* Orbiting particles */}
      {PARTICLES.map((p) => (
        <OrbParticle key={p.id} angle={p.angle} distance={p.distance} orbState={orbState} />
      ))}

      {/* Main orb sphere — clickable */}
      <button
        onClick={onClick}
        aria-label="Astra AI orb — tap to interact"
        className={cn(
          "relative aspect-square w-[70%] h-[70%] rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00B8DB]/50"
        )}
        style={{
          background: "linear-gradient(135deg, #00B8DB 0%, #7F22FE 50%, #C800DE 100%)",
          boxShadow: `0 0 50px 15px ${glowColor}, 0 0 100px 40px ${glowColorSecond}`,
          animation: pulseAnimation,
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          }}
        />
        {/* Inner glow ring */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }}
        />
      </button>

      {/* Bottom shadow blur */} 
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8 rounded-full bottom-shadow-pulse pointer-events-none"
        style={{
          width: "80%",
          background: "linear-gradient(90deg, transparent 0%, rgba(142,81,255,0.15) 50%, transparent 100%)",
          filter: "blur(24px)",
          bottom: "-4px",
        }}
      />
    </div>
  );
} 

// ─── Dashboard ────────────────────────────────────────────────────────────

export default function Index() {
  const [activeNav, setActiveNav] = useState(() =>
    readStoredString("astra-active-nav", "meeting-summary")
  );

  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeControls, setActiveControls] = useState<string[]>(() =>
    readStoredStringArray("astra-active-controls", ["ask-ai"])
  );

  const [notes, setNotes] = useState(() =>
    readStoredString("astra-notes", DEFAULT_NOTES)
  );

  const [generatedSummary, setGeneratedSummary] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("astra-active-nav", activeNav);
  }, [activeNav]);

  useEffect(() => {
    window.localStorage.setItem(
      "astra-active-controls",
      JSON.stringify(activeControls)
    );
  }, [activeControls]);

  useEffect(() => {
    window.localStorage.setItem("astra-notes", notes);
  }, [notes]);

  const handleOrbClick = () => {
    // Cycle through states: idle -> listening -> thinking -> idle
    switch (orbState) {
      case "idle":
        setOrbState("listening");
        break;
      case "listening":
        setOrbState("thinking");
        break;
      case "thinking":
        setOrbState("idle");
        break;
    }
  };

  const getStatusText = () => {
    switch (orbState) {
      case "listening":
        return "Listening…";
      case "thinking":
        return "Thinking…";
      default:
        return "Listening…";
    }
  };

  const getHintText = () => {
    switch (orbState) {
      case "idle":
        return "Tap orb to activate";
      case "listening":
        return "Tap orb to think";
      case "thinking":
        return "Tap orb to pause";
    }
  };

  const handleControlClick = (controlId: string) => {
    if (controlId === "ask-ai") {
      setActiveControls((current) =>
        current.includes("ask-ai") ? current : [...current, "ask-ai"]
      );

      setOrbState("thinking");

      window.setTimeout(() => {
        setActiveControls((current) => {
          const next = current.filter((id) => id !== "ask-ai");
          setOrbState(getOrbStateForControls(next));
          return next;
        });
      }, 2000);

      return;
    }

    setActiveControls((current) => {
      const next = current.includes(controlId)
        ? current.filter((id) => id !== controlId)
        : [...current, controlId];

      if (controlId === "mic" || controlId === "record") {
        setOrbState(getOrbStateForControls(next));
      }

      return next;
    });
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setOrbState("thinking");

    window.setTimeout(() => {
      setGeneratedSummary(MOCK_GENERATED_SUMMARY);
      setIsGenerating(false);

      setActiveControls((current) => {
        setOrbState(getOrbStateForControls(current));
        return current;
      });
    }, 1400);
  };

  const handleExportNotes = () => {
    const content = `# Astra Meeting Notes

  ## Live Notes

  ${notes}

  ## Generated Summary

  ${generatedSummary || "No generated summary yet."}
  `;

    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "astra-meeting-notes.md";
    link.click();

    URL.revokeObjectURL(url);
  };

  const renderActivePanel = () => {
    switch (activeNav) {
      case "live-notes":
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-2">Live Notes</h3>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full min-h-28 resize-none rounded-xl border border-[rgba(49,65,88,0.6)] bg-[rgba(2,6,24,0.65)] p-3 text-sm text-[#CAD5E2] outline-none focus:border-[#53EAFD]"
              placeholder="Type meeting notes here..."
            />
          </div>
        );

      case "action-items":
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Action Items</h3>
            <ul className="space-y-2 text-sm text-[#CAD5E2]">
              <li>□ Test Netlify deployment on mobile and desktop.</li>
              <li>□ Prepare Raspberry Pi 5 kiosk-mode test.</li>
              <li>□ Replace mock summary with real assistant logic later.</li>
            </ul>
          </div>
        );

      case "translation":
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-2">Translation</h3>
            <p className="text-sm text-[#90A1B9]">
              Translation mode is ready. Real translation can be connected later through an API.
            </p>
          </div>
        );

      case "search-memory":
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-2">Search Memory</h3>
            <input
              className="w-full rounded-xl border border-[rgba(49,65,88,0.6)] bg-[rgba(2,6,24,0.65)] p-3 text-sm text-[#CAD5E2] outline-none focus:border-[#53EAFD]"
              placeholder="Search previous meeting memory..."
            />
            <p className="mt-3 text-xs text-[#90A1B9]">
              Mock result: Product roadmap discussion found.
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Settings</h3>
            <div className="space-y-2 text-sm text-[#CAD5E2]">
              <p>AI Online: enabled</p>
              <p>Edge Network: excellent</p>
              <p>Local persistence: enabled</p>
            </div>
          </div>
        );

      case "meeting-summary":
      default:
        return (
          <div className="w-full rounded-2xl border border-[rgba(49,65,88,0.5)] bg-[rgba(15,23,43,0.55)] p-4">
            <h3 className="text-white text-sm font-semibold mb-2">Meeting Summary</h3>
            <p className="text-sm text-[#CAD5E2] whitespace-pre-line">
              {generatedSummary ? (
                generatedSummary
              ) : (
                "No generated summary yet. Click Generate Summary to create one."
              )}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020618] flex items-center justify-center p-0 lg:p-4 font-inter">
      {/* Main Card */}
      <div
        className="relative w-full lg:max-w-[1366px] min-h-screen lg:min-h-0 lg:h-[1024px] rounded-none lg:rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(135deg, #020618 0%, #0F172B 50%, #020618 100%)",
          border: "1px solid rgba(29,41,61,0.5)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        {/* ── Top Bar ── */}
        <header
          className="flex items-center justify-between px-4 sm:px-6 py-4 flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(0,184,219,0.2)",
            background: "rgba(15,23,43,0.4)",
          }}
        >
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Logo */}
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #00B8DB 0%, #7F22FE 100%)" }}
              >
                <span className="text-white font-bold text-sm leading-none">Q</span>
              </div>
              <span className="text-white font-semibold text-lg leading-7 hidden xs:block">Qmeet AI</span>
            </div>
            <span className="text-[#CAD5E2] text-sm font-normal hidden sm:block">AI Assistant Console</span>
          </div>

          {/* Center: Status badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="flex items-center px-3 py-[5px] rounded-full text-[#5EE9B5] text-xs font-medium"
              style={{
                border: "1px solid rgba(0,212,146,0.4)",
                background: "rgba(0,188,125,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EE9B5] mr-1.5 animate-pulse" />
              AI Online
            </div>
            <div
              className="hidden sm:flex items-center px-3 py-[5px] rounded-full text-[#53EAFD] text-xs font-medium"
              style={{
                border: "1px solid rgba(0,211,243,0.4)",
                background: "rgba(0,184,219,0.2)",
              }}
            >
              Edge Network • Excellent
            </div>
          </div>

          {/* Right: Icons + User */}
          <div className="flex items-center gap-3">
            <button className="text-[#90A1B9] hover:text-[#CAD5E2] transition-colors hidden sm:block">
              <IconWifi />
            </button>
            <button className="text-[#90A1B9] hover:text-[#CAD5E2] transition-colors hidden sm:block">
              <IconBattery />
            </button>
            <button className="text-[#90A1B9] hover:text-[#CAD5E2] transition-colors">
              <IconBell />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #8E51FF 0%, #C800DE 100%)" }}
            >
              <IconUser />
            </button>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-[#90A1B9] hover:text-[#CAD5E2] transition-colors p-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* ── Left Sidebar ── */}
          <aside
            className={cn(
              "absolute lg:relative inset-y-0 left-0 z-20 transition-transform duration-300 flex flex-col",
              "lg:translate-x-0 lg:w-64 lg:flex-shrink-0",
              sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
            )}
            style={{
              borderRight: "1px solid rgba(29,41,61,0.5)",
              background: "rgba(15,23,43,0.9)",
            }}
          >
            <nav className="flex flex-col gap-2 p-4 pt-4">
              {NAV_ITEMS.map((item) => {
                const isNavActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all duration-200 text-left",
                      isNavActive
                        ? "text-[#53EAFD]"
                        : "text-[#90A1B9] hover:text-[#CAD5E2] hover:bg-[rgba(29,41,61,0.5)] active:bg-[rgba(29,41,61,0.7)]"
                    )}
                    style={
                      isNavActive
                        ? {
                            border: "1px solid rgba(0,211,243,0.5)",
                            background: "rgba(0,184,219,0.2)",
                            boxShadow: "0 10px 15px -3px rgba(0,184,219,0.2), 0 4px 6px -4px rgba(0,184,219,0.2)",
                          }
                        : {
                            border: "1px solid rgba(49,65,88,0.5)",
                            background: "rgba(29,41,61,0.3)",
                          }
                    }
                  >
                    <item.icon active={isNavActive} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Sidebar overlay for mobile */}
          {sidebarOpen && (
            <div
              className="absolute inset-0 z-10 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── Center Area ── */}
          <main className="flex-1 flex flex-col items-center justify-start lg:justify-center relative overflow-y-auto overflow-x-hidden min-h-[400px] py-6">
            {/* Orb */}
            <AstraOrb orbState={orbState} onClick={handleOrbClick} />

            {/* Name */}
            <h1 className="text-white text-2xl font-semibold leading-8 mt-6">Astra</h1>

            {/* Subtitle */}
            <p className="text-[#90A1B9] text-sm font-normal mt-1">
              Real-time meeting intelligence assistant
            </p>

            {/* Status badge */}
            <div
              className="flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[#53EAFD] text-xs font-medium mt-4 transition-all duration-300"
              style={{
                border: "1px solid rgba(0,211,243,0.4)",
                background: "rgba(0,184,219,0.2)",
              }}
            >
              {orbState !== "idle" ? (
                <>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#53EAFD]"
                    style={{ animation: orbState === "thinking" ? "fade-pulse 0.6s ease-in-out infinite" : "fade-pulse 1s ease-in-out infinite" }}
                  />
                  {getStatusText()}
                </>
              ) : (
                <>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#53EAFD]"
                    style={{ animation: "fade-pulse 2s ease-in-out infinite" }}
                  />
                  Listening…
                </>
              )}
            </div>

            {/* Tap hint */}
            <p className="text-[#90A1B9]/50 text-xs mt-3">
              {getHintText()}
            </p>
            <div className="mt-5 w-full max-w-xl px-4 shrink-0">
              {renderActivePanel()}
            </div>
          </main>

          {/* ── Right Sidebar ── */}
          <aside
            className="hidden lg:flex w-80 flex-shrink-0 flex-col p-4 gap-4 overflow-y-auto"
            style={{
              borderLeft: "1px solid rgba(29,41,61,0.5)",
              background: "rgba(15,23,43,0.2)",
            }}
          >
            <h2 className="text-white text-lg font-semibold leading-7">AI Insights</h2>

            {/* Insight cards */}
            <div className="flex flex-col gap-3">
              {INSIGHTS.map((insight) => (
                <div
                  key={insight.label}
                  className="flex flex-col gap-1 p-4 rounded-[14px] transition-all duration-200 cursor-default hover:scale-105 active:scale-95"
                  style={
                    insight.highlight
                      ? {
                          border: "1px solid rgba(166,132,255,0.3)",
                          background: "rgba(142,81,255,0.1)",
                        }
                      : {
                          border: "1px solid rgba(49,65,88,0.4)",
                          background: "rgba(29,41,61,0.4)",
                        }
                  }
                >
                  <span className="text-[#90A1B9] text-xs font-normal leading-4">
                    {insight.label}
                  </span>
                  <span className="text-white text-sm font-semibold leading-5">
                    {insight.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-auto pt-2">
              <button
                type="button"
                onClick={handleGenerateSummary}
                className="w-full py-3 px-6 rounded-[14px] text-white text-base font-medium transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 active:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #00B8DB 0%, #7F22FE 100%)",
                  boxShadow: "0 10px 15px -3px rgba(0,184,219,0.2), 0 4px 6px -4px rgba(0,184,219,0.2)",
                }}
              >
                {isGenerating ? "Generating..." : "Generate Summary"}
              </button>
              <button
                type="button"
                onClick={handleExportNotes}
                className="w-full py-[11px] px-6 rounded-[14px] text-[#CAD5E2] text-base font-medium transition-all duration-200 hover:scale-105 hover:bg-[rgba(29,41,61,0.9)] active:scale-95 active:bg-[rgba(29,41,61,0.7)]"
                style={{
                  border: "1px solid rgba(49,65,88,0.5)",
                  background: "rgba(29,41,61,0.6)",
                }}
              >
                Export Notes
              </button>
            </div>
          </aside>
        </div>

        {/* ── Bottom Bar ── */}
        <footer
          className="flex-shrink-0 flex flex-col gap-4 pt-3 pb-4 px-4 sm:px-6"
          style={{ borderTop: "1px solid rgba(29,41,61,0.4)" }}
        >
          {/* Timeline segments */}
          <div className="hidden sm:flex items-center justify-center gap-4 flex-wrap">
            {TIMELINE.map((segment) => (
              <div key={segment.label} className="flex flex-col items-start gap-1">
                <div
                  className="w-28 h-2 rounded-full"
                  style={{ background: segment.color, opacity: segment.opacity }}
                />
                <span className="text-[#90A1B9] text-xs font-normal">{segment.label}</span>
              </div>
            ))}
          </div>

          {/* Dot separator */}
          <div className="hidden sm:flex items-center justify-center gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full opacity-30"
                style={{ background: "linear-gradient(0deg, #00B8DB 0%, #8E51FF 100%)" }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center">
            <div
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl"
              style={{
                border: "1px solid rgba(49,65,88,0.5)",
                background: "rgba(15,23,43,0.6)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              {CONTROLS.map((ctrl) => {
                const isControlActive = activeControls.includes(ctrl.id);

                return (
                  <button
                    key={ctrl.id}
                    type="button"
                    aria-pressed={isControlActive}
                    onClick={() => handleControlClick(ctrl.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-[14px] transition-all duration-200 hover:scale-110 active:scale-90",
                      "text-[10px] xs:text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53EAFD]",
                      isControlActive
                        ? "text-white hover:opacity-90"
                        : "text-[#CAD5E2] hover:bg-[rgba(29,41,61,0.8)] hover:border-[rgba(0,211,243,0.5)]"
                    )}
                    style={
                      isControlActive
                        ? {
                            background: "linear-gradient(135deg, #00B8DB 0%, #7F22FE 100%)",
                            boxShadow: "0 10px 15px -3px rgba(0,184,219,0.3), 0 4px 6px -4px rgba(0,184,219,0.3)",
                          }
                        : {
                            border: "1px solid rgba(49,65,88,0.5)",
                            background: "rgba(29,41,61,0.6)",
                          }
                    }
                  >
                    <ctrl.icon />
                    <span className="whitespace-nowrap">{ctrl.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
