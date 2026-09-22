import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useUndo } from "./useUndo";

describe("useUndo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps a pending value for the configured delay", () => {
    const { result } = renderHook(() => useUndo<string>(5000));
    act(() => result.current.start("Tâche supprimée"));

    expect(result.current.pending).toBe("Tâche supprimée");
    expect(result.current.remainingMs).toBe(5000);

    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.pending).toBeNull();
  });

  it("returns the pending value and clears the timer when undone in time", () => {
    const { result } = renderHook(() => useUndo<string>(5000));
    act(() => result.current.start("À restaurer"));

    let restored: string | null = null;
    act(() => {
      restored = result.current.undo();
    });
    act(() => vi.advanceTimersByTime(5000));

    expect(restored).toBe("À restaurer");
    expect(result.current.pending).toBeNull();
  });

  it("suspends expiration while the user keeps the undo window engaged", () => {
    const { result } = renderHook(() => useUndo<string>(5000));
    act(() => result.current.start("À garder"));
    act(() => vi.advanceTimersByTime(2000));

    act(() => result.current.pause());
    expect(result.current.remainingMs).toBe(3000);
    expect(result.current.isPaused).toBe(true);

    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current.pending).toBe("À garder");

    act(() => result.current.resume());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.pending).toBeNull();
  });

  it("replaces the previous pending undo with the most recent deletion", () => {
    const { result } = renderHook(() => useUndo<string>(5000));
    act(() => result.current.start("Première"));
    act(() => vi.advanceTimersByTime(1000));
    act(() => result.current.start("Deuxième"));

    act(() => vi.advanceTimersByTime(4000));
    expect(result.current.pending).toBe("Deuxième");
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.pending).toBeNull();
  });

  it("cleans up scheduled expiration on unmount", () => {
    const { result, unmount } = renderHook(() => useUndo<string>(5000));
    act(() => result.current.start("À nettoyer"));
    unmount();

    expect(() => act(() => vi.advanceTimersByTime(5000))).not.toThrow();
  });
});
