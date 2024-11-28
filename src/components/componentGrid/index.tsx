"use client";

import { AddComponent } from "../addComponent";
import { renderComponent } from "../renderComponent";
import { ComponentHeader } from "../componentHeader";
import { GenericComponentProps } from "@/types/component";
import { ComponentChildren } from "@/contexts/types";
import { usePage } from "@/contexts/components";

export const ComponentGrid = ({
  sectionId,
  componentChildren,
}: GenericComponentProps) => {
  const gridChildren = componentChildren as ComponentChildren[];

  const { removeSection } = usePage();

  return (
    <div
      className={`grid grid-cols-${gridChildren.length} gap-4 p-4 relative pt-8`}
    >
      <ComponentHeader
        title=""
        sectionId={sectionId}
        handleRemove={() => removeSection(sectionId)}
      />
      {gridChildren.map((column) => {
        if (!column?.component) {
          return (
            <AddComponent
              key={column.id}
              sectionId={sectionId}
              gridParent={column?.id}
            />
          );
        }
        return <>{renderComponent(column.component, sectionId, true)}</>;
      })}
    </div>
  );
};
