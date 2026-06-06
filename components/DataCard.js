export default function DataCard(caption, value) {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{caption}</p>
            <p className="text-xl font-semibold text-foreground">{value}</p>
        </div>
    );
}