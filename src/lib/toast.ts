export const TOAST_EVENT = 'km:toast';

export type ToastKind = 'ok' | 'warn';

export type ToastDetail = {
  title: string;
  body?: string;
  kind: ToastKind;
};

/** Fire a toast from anywhere; the Toaster in the root layout renders it. */
export function toast(title: string, body?: string, kind: ToastKind = 'ok'): void {
  window.dispatchEvent(
    new CustomEvent<ToastDetail>(TOAST_EVENT, { detail: { title, body, kind } }),
  );
}
