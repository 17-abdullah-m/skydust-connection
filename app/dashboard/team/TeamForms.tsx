"use client";

import { useActionState } from "react";
import { createInviteAction, removeMemberAction, type TeamState } from "@/app/actions/team";

const initial: TeamState = {};

export function InviteForm() {
  const [state, action, pending] = useActionState(createInviteAction, initial);

  return (
    <form action={action} className="mt-6 max-w-md space-y-3">
      <label htmlFor="email" className="text-sm text-neutral-700">
        Invite by email
      </label>
      <div className="flex gap-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="teammate@company.com"
          className="min-w-0 flex-1 border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {pending ? "Creating…" : "Invite"}
        </button>
      </div>
      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.inviteUrl ? (
        <p className="break-all text-sm text-neutral-600">
          Invite link (copy and send):{" "}
          <span className="font-medium text-black">
            {typeof window !== "undefined"
              ? `${window.location.origin}${state.inviteUrl}`
              : state.inviteUrl}
          </span>
        </p>
      ) : null}
    </form>
  );
}

export function RemoveMemberButton({ membershipId }: { membershipId: string }) {
  return (
    <form action={removeMemberAction}>
      <input type="hidden" name="membershipId" value={membershipId} />
      <button type="submit" className="text-xs text-red-600 underline underline-offset-4">
        Remove
      </button>
    </form>
  );
}
