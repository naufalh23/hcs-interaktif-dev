"use client";

export default function ConfirmDeleteModal({
  user,
  onCancel,
  onConfirm,
}: any) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">

        <h2 className="text-xl text-center font-bold mb-4">Hapus Akun</h2>

        <p className="text-md mt-2 text-center">
          Yakin hapus <b>{user.name}</b>?
        </p>

        <div className="flex gap-2 mt-6">
          <button onClick={onCancel} className="flex-1 border py-2 rounded">
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}