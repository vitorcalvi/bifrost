import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NumberAndSelect from "@/components/ui/numberAndSelect";
import { resetDurationOptions } from "@/lib/constants/governance";
import { Plus, Trash2 } from "lucide-react";

export interface BudgetLineEntry {
	max_limit: string;
	reset_duration: string;
}

interface MultiBudgetLinesProps {
	id: string;
	label?: string;
	lines: BudgetLineEntry[];
	onChange: (lines: BudgetLineEntry[]) => void;
	options?: { label: string; value: string }[];
}

export default function MultiBudgetLines({
	id,
	label = "Budget Configuration",
	lines,
	onChange,
	options = resetDurationOptions,
}: MultiBudgetLinesProps) {
	function addLine() {
		onChange([...lines, { max_limit: "", reset_duration: "1M" }]);
	}

	function removeLine(index: number) {
		onChange(lines.filter((_, i) => i !== index));
	}

	function updateLine(index: number, field: keyof BudgetLineEntry, value: string) {
		const updated = [...lines];
		updated[index] = { ...updated[index], [field]: value };
		onChange(updated);
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label className="text-sm font-medium">{label}</Label>
				<Button variant="outline" size="sm" type="button" onClick={addLine}>
					<Plus className="mr-1 h-3 w-3" />
					Add Budget
				</Button>
			</div>

			{lines.length === 0 && (
				<div className="rounded-md border border-dashed p-3 text-center text-sm text-muted-foreground">
					No budget limits configured.
				</div>
			)}

			{lines.map((line, index) => (
				<div key={index} className="flex items-end gap-2">
					<div className="flex-1">
						<NumberAndSelect
							id={`${id}-${index}`}
							labelClassName="font-normal"
							label="Maximum Spend (USD)"
							value={line.max_limit}
							selectValue={line.reset_duration}
							onChangeNumber={(value) => updateLine(index, "max_limit", value)}
							onChangeSelect={(value) => updateLine(index, "reset_duration", value)}
							options={options}
						/>
					</div>
					<Button
						variant="ghost"
						size="icon"
						type="button"
						className="mb-0.5 h-8 w-8 shrink-0 text-destructive"
						onClick={() => removeLine(index)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
		</div>
	);
}
