function formatClimbDate(inputDate: string): string {
    const date = new Date(inputDate);
    const now = new Date();

    // Reset heures/min/sec pour comparer uniquement les jours
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const target = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    // Aujourd'hui
    if (target.getTime() === today.getTime()) {
        return "Aujourd’hui";
    }

    // Demain
    if (target.getTime() === tomorrow.getTime()) {
        return "Demain";
    }

    // Sinon : jeudi 28 mai
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}

export default formatClimbDate;
