import React from "react";

import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import Grid from "@ui/Grid";
import PageHeader from "@ui/PageHeader";
import i18n from "../../../i18n";
import { UserError } from "../../../types";
import { SaleType } from "../../../types/globalTypes";
import SaleInfo from "../SaleInfo";
import SalePricing from "../SalePricing";

export interface FormData {
  name: string;
  startDate: string;
  endDate: string;
  value: string;
  type: SaleType;
}

export interface SaleCreatePageProps {
  defaultCurrency: string;
  disabled: boolean;
  errors: UserError[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const SaleCreatePage: React.StatelessComponent<SaleCreatePageProps> = ({
  defaultCurrency,
  disabled,
  errors,
  onSubmit,
  saveButtonBarState,
  onBack
}) => {
  const initialForm: FormData = {
    endDate: "",
    name: "",
    startDate: "",
    type: SaleType.FIXED,
    value: ""
  };
  return (
    <Form errors={errors} initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, errors: formErrors, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>{i18n.t("Sales")}</AppHeader>
          <PageHeader title={i18n.t("Create Sale")} />
          <Grid>
            <div>
              <SaleInfo
                data={data}
                disabled={disabled}
                errors={formErrors}
                onChange={change}
              />
              <CardSpacer />
              <SalePricing
                data={data}
                defaultCurrency={defaultCurrency}
                disabled={disabled}
                errors={formErrors}
                onChange={change}
              />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            onCancel={onBack}
            onSave={submit}
            state={saveButtonBarState}
          />
        </Container>
      )}
    </Form>
  );
};
SaleCreatePage.displayName = "SaleCreatePage";
export default SaleCreatePage;
