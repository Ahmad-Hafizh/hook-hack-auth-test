export function LPCopyFooter() {
  const partners = ["Letro", "echoes", "Kameleon", "Shopcast", "spark", "アライドアーキテクト"]

  return (
    <footer className="bg-white py-12 border-t border-[#eee]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          {partners.map((partner, index) => (
            <div key={index} className="text-[#999] font-bold">
              {partner}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-[#999]">
          <p>© Allied Architects, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

