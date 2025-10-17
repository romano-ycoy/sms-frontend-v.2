import { Filter, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Badge } from "@/shared/ui/badge";

export function FilterDropdown({ filters, onFilterChange, onResetFilters }) {
    const emailFilters = ["All", "Gmail", "Yahoo", "Outlook"];

    const activeFilterCount = Object.values(filters).filter(
        value => value !== "All" && value !== "None"
    ).length;

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge
                                variant="destructive"
                                className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full"
                            >
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by Email Provider</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {emailFilters.map((filter) => (
                        <DropdownMenuCheckboxItem
                            key={filter}
                            checked={filters.email === filter}
                            onCheckedChange={() => onFilterChange('email', filter)}
                        >
                            {filter}
                        </DropdownMenuCheckboxItem>
                    ))}

                    {activeFilterCount > 0 && (
                        <>
                            <DropdownMenuSeparator />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onResetFilters}
                                className="w-full justify-start text-sm"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear all filters
                            </Button>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}