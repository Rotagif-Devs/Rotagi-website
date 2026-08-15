"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService } from "@/lib/services/cohort.service";

function Banner({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-xl mb-6 border ${
        isSuccess ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"
      }`}
    >
      {isSuccess ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
      <p className="text-sm font-semibold">{children}</p>
    </div>
  );
}

const FONT_OPTIONS = [
  { value: "sans-serif", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "cursive", label: "Cursive / Script" },
];

export default function CohortCertificateTemplateEditor({ program }: { program: string }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imgScale, setImgScale] = useState(1);

  const [nameX, setNameX] = useState(50);
  const [nameY, setNameY] = useState(55);
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#1a1a1a");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  const [certificatesEnabled, setCertificatesEnabled] = useState(false);
  const [eligibleCount, setEligibleCount] = useState(0);
  const [hasSavedTemplate, setHasSavedTemplate] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    cohortService
      .getCertificateTemplate(program)
      .then((data) => {
        if (data.template) {
          setPreviewSrc(data.template.imageUrl);
          setNameX(data.template.nameX);
          setNameY(data.template.nameY);
          setFontSize(data.template.fontSize);
          setFontColor(data.template.fontColor);
          setFontFamily(data.template.fontFamily);
          setHasSavedTemplate(true);
        }
        setCertificatesEnabled(data.certificatesEnabled);
        setEligibleCount(data.eligibleLearnerCount);
      })
      .catch(() => {
        setStatus({ type: "error", msg: "Could not load the current certificate template." });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    if (f) setPreviewSrc(URL.createObjectURL(f));
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.naturalWidth > 0) setImgScale(el.clientWidth / el.naturalWidth);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setNameX(Math.round(xPct * 10) / 10);
    setNameY(Math.round(yPct * 10) / 10);
  };

  const handleSave = async () => {
    if (!previewSrc) {
      setStatus({ type: "error", msg: "Upload a certificate image first." });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      await cohortService.saveCertificateTemplate(program, {
        file: imageFile,
        nameX,
        nameY,
        fontSize,
        fontColor,
        fontFamily,
      });
      setStatus({ type: "success", msg: "Certificate template saved." });
      setHasSavedTemplate(true);
      setImageFile(null);
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to save the certificate template." });
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Remove the current certificate template? Certificates will be turned off for learners until a new one is uploaded.")) {
      return;
    }
    setRemoving(true);
    setStatus(null);
    try {
      await cohortService.deleteCertificateTemplate(program);
      setPreviewSrc(null);
      setImageFile(null);
      setHasSavedTemplate(false);
      setCertificatesEnabled(false);
      setNameX(50);
      setNameY(55);
      setFontSize(48);
      setFontColor("#1a1a1a");
      setFontFamily("sans-serif");
      setStatus({ type: "success", msg: "Certificate template removed." });
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to remove the certificate template." });
    } finally {
      setRemoving(false);
    }
  };

  const handleToggle = async () => {
    setToggling(true);
    setStatus(null);
    try {
      const next = !certificatesEnabled;
      await cohortService.toggleCertificates(program, next);
      setCertificatesEnabled(next);
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to update certificate availability." });
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-gray-400 py-10">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading template…
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Certificate Template</h3>
      <p className="text-gray-500 mb-6">
        Upload the certificate design, then click directly on it to mark where each learner&apos;s name goes.
        Certificates are generated automatically per learner.
      </p>

      {status && <Banner type={status.type}>{status.msg}</Banner>}

      <div className="mb-4 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Image (.png / .jpg)</label>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
        </div>
        {hasSavedTemplate && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="text-sm font-bold text-red-600 hover:underline disabled:opacity-50"
          >
            {removing ? "Removing…" : "Remove Template"}
          </button>
        )}
      </div>

      {previewSrc && (
        <>
          <p className="text-sm text-gray-500 mb-2">Click on the certificate to set where the learner&apos;s name goes.</p>
          <div className="relative inline-block border border-gray-200 rounded-xl overflow-hidden mb-6 max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- object URL / arbitrary uploaded-file preview */}
            <img
              src={previewSrc}
              alt="Certificate template"
              onLoad={handleImageLoad}
              onClick={handleImageClick}
              className="max-w-full h-auto cursor-crosshair select-none block"
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
              style={{
                left: `${nameX}%`,
                top: `${nameY}%`,
                fontSize: `${Math.max(fontSize * imgScale, 8)}px`,
                color: fontColor,
                fontFamily,
              }}
            >
              Jane Doe
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Font size</label>
              <input
                type="number"
                min={8}
                max={300}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Font style</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg bg-white"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="button" variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Template"}
          </Button>
        </>
      )}

      {hasSavedTemplate && (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-gray-900">
              {certificatesEnabled ? "Certificates are ON for learners" : "Certificates are OFF for learners"}
            </p>
            <p className="text-sm text-gray-500">
              {eligibleCount} learner{eligibleCount === 1 ? "" : "s"} eligible, from the Email + Full Name
              spreadsheet above.
            </p>
          </div>
          <Button
            type="button"
            variant={certificatesEnabled ? undefined : "primary"}
            className={certificatesEnabled ? "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50" : undefined}
            onClick={handleToggle}
            disabled={toggling}
          >
            {toggling ? "Updating…" : certificatesEnabled ? "Turn Certificates OFF" : "Turn Certificates ON"}
          </Button>
        </div>
      )}
    </div>
  );
}
