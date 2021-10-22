import { Button } from "components/shared/Button";
import { TextInput, TextArea } from "components/shared/TextInput";
import { Wiki } from "domain/Wiki";
import { useAuth } from "providers/AuthProvider";
import React, { useState } from "react";

export interface WikiFormProps {
  existingWiki?: Wiki;
  submitWiki: (wiki: Wiki) => void;
}

export const WikiForm: React.FC<WikiFormProps> = (props) => {
  const { existingWiki, submitWiki } = props;
  const { user } = useAuth();

  const editing = !!existingWiki;

  const [wiki, setWiki] = useState<Partial<Wiki>>(
    existingWiki ?? {
      userIds: [user?.uid ?? ""],
      userRoles: {
        [user?.uid ?? ""]: {
          canDelete: true,
          canRead: true,
          canWrite: true,
        },
      },
      rootPages: [],
    }
  );

  const updateName = (name: string) => {
    setWiki((prevWiki) => {
      let newWiki = { ...prevWiki };
      newWiki.name = name;
      return newWiki;
    });
  };

  const updateDescription = (description: string) => {
    setWiki((prevWiki) => {
      let newWiki = { ...prevWiki };
      newWiki.description = description;
      return newWiki;
    });
  };

  const handleSubmit = () => {
    if (wiki.name) {
      submitWiki(wiki as Wiki);
    }
  };

  return (
    <form className={"flex flex-col"}>
      <TextInput
        id={"wiki-name"}
        label={"Wiki Name"}
        value={wiki.name ?? ""}
        onChange={(evt) => updateName(evt.currentTarget.value)}
        required
      />
      <TextArea
        id={"wiki-description"}
        label={"Wiki Description"}
        value={wiki.description ?? ""}
        onChange={(evt) => updateDescription(evt.currentTarget.value)}
      />
      <div className={"flex justify-end space-x-2"}>
        <Button
          id={editing ? "update-wiki" : "create-wiki"}
          type={"submit"}
          variant={"contained"}
          color={"primary"}
          onClick={(evt) => {
            evt.preventDefault();
            handleSubmit();
          }}
        >
          {editing ? "Update Wiki" : "Create Wiki"}
        </Button>
      </div>
    </form>
  );
};
