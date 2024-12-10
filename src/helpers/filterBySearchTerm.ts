type SearchableField<T> = (item: T) => string | undefined;

export function filterBySearchTerm<T>(
    searchTerm: string,
    items: T[],
    searchableFields: SearchableField<T>[]
): T[] {
    const normalizedSearchTerm = searchTerm.toUpperCase();
    return items.filter((item) =>
        searchableFields.some((getField) => {
            const fieldValue = getField(item);
            return fieldValue?.toUpperCase().includes(normalizedSearchTerm);
        })
    );
}
