"use client";

import { useState } from "react";
import { type PricingPackage } from "@/lib/packages";
import { createPackage, updatePackage, deletePackage, togglePackageActive, togglePackagePopular, seedDefaultPackages } from "./actions";
import { Plus, Edit2, Trash2, Check, X, Star, Upload } from "lucide-react";

export default function PricingAdminClient({ packages }: { packages: PricingPackage[] }) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // For the sake of brevity in this implementation, we use simple forms.
  // In a full production build, this would be a detailed form with validation.

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Pricing ({packages.length} packages)</h2>
        <div className="flex gap-4">
          {packages.length === 0 && (
            <form action={seedDefaultPackages}>
              <button 
                type="submit"
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors"
              >
                <Upload className="w-4 h-4" /> Seed Default Packages
              </button>
            </form>
          )}
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="glass p-6 rounded-xl border border-brand-accent/50">
          <h2 className="text-xl font-bold mb-4">Create New Package</h2>
          <form action={createPackage} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Package Name" required className="bg-black/50 border border-white/10 rounded-lg p-3" />
              <input name="service_name" placeholder="Service Name" required className="bg-black/50 border border-white/10 rounded-lg p-3" />
              <input name="slug" placeholder="Slug" required className="bg-black/50 border border-white/10 rounded-lg p-3" />
              <input name="category" placeholder="Category" required className="bg-black/50 border border-white/10 rounded-lg p-3" />
              <input name="price" placeholder="Display Price (e.g. Starting from ₹15k)" required className="bg-black/50 border border-white/10 rounded-lg p-3" />
              <input name="starting_price" placeholder="Numeric/Base Price" className="bg-black/50 border border-white/10 rounded-lg p-3" />
            </div>
            <textarea name="description" placeholder="Description" rows={3} className="bg-black/50 border border-white/10 rounded-lg p-3" />
            <textarea name="features" placeholder="Features (one per line)" rows={4} className="bg-black/50 border border-white/10 rounded-lg p-3" />
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked /> Active</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="popular" /> Popular</label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-brand-accent text-black font-bold hover:bg-white">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="glass p-6 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-brand-accent px-2 py-1 bg-brand-accent/10 rounded-full">{pkg.category}</span>
                <div className="flex gap-2">
                  <form action={togglePackagePopular.bind(null, pkg.id, !pkg.popular)}>
                    <button type="submit" title="Toggle Popular" className={`p-1.5 rounded-md ${pkg.popular ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-white/30 hover:text-white'}`}>
                      <Star className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={togglePackageActive.bind(null, pkg.id, !pkg.active)}>
                    <button type="submit" title="Toggle Active" className={`p-1.5 rounded-md ${pkg.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {pkg.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </form>
                </div>
              </div>
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <div className="text-lg font-mono text-white/70 mt-1">{pkg.price}</div>
              <p className="text-sm text-white/50 mt-3 line-clamp-2">{pkg.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/10">
              <button onClick={() => setIsEditing(pkg.id)} className="p-2 bg-white/5 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white"><Edit2 className="w-4 h-4" /></button>
              <form action={deletePackage.bind(null, pkg.id)}>
                <button type="submit" className="p-2 bg-red-500/10 hover:bg-red-500/30 rounded-lg transition-colors text-red-500"><Trash2 className="w-4 h-4" /></button>
              </form>
            </div>

            {isEditing === pkg.id && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Package</h2>
                  <form action={updatePackage.bind(null, pkg.id)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="name" defaultValue={pkg.name} required className="bg-black/50 border border-white/10 rounded-lg p-3" />
                      <input name="service_name" defaultValue={pkg.service_name || ""} required className="bg-black/50 border border-white/10 rounded-lg p-3" />
                      <input name="slug" defaultValue={pkg.slug || ""} required className="bg-black/50 border border-white/10 rounded-lg p-3" />
                      <input name="category" defaultValue={pkg.category || ""} required className="bg-black/50 border border-white/10 rounded-lg p-3" />
                      <input name="price" defaultValue={pkg.price} required className="bg-black/50 border border-white/10 rounded-lg p-3" />
                      <input name="starting_price" defaultValue={pkg.starting_price || ""} className="bg-black/50 border border-white/10 rounded-lg p-3" />
                    </div>
                    <textarea name="description" defaultValue={pkg.description || ""} rows={3} className="bg-black/50 border border-white/10 rounded-lg p-3" />
                    <textarea name="features" defaultValue={pkg.features?.join("\n") || ""} rows={4} className="bg-black/50 border border-white/10 rounded-lg p-3" />
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked={pkg.active} /> Active</label>
                      <label className="flex items-center gap-2"><input type="checkbox" name="popular" defaultChecked={pkg.popular} /> Popular</label>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
                      <button type="submit" onClick={() => setTimeout(() => setIsEditing(null), 100)} className="px-4 py-2 rounded-lg bg-brand-accent text-black font-bold hover:bg-white">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
