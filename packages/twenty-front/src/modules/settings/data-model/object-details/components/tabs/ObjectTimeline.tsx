import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { SettingsOptionCardContentToggle } from '@/settings/components/SettingsOptions/SettingsOptionCardContentToggle';
import { SettingsObjectTimelineRulesTable } from '@/settings/data-model/object-details/components/SettingsObjectTimelineRulesTable';
import { getSettingsTimelineActivityRules } from '@/settings/data-model/object-details/utils/getSettingsTimelineActivityRules';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { IconTimelineEvent } from 'twenty-ui/icon';
import { Section } from 'twenty-ui/layout';
import { Card } from 'twenty-ui/surfaces';
import { H2Title } from 'twenty-ui/typography';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[8]};
`;

type ObjectTimelineProps = {
  objectMetadataItem: EnrichedObjectMetadataItem;
};

export const ObjectTimeline = ({ objectMetadataItem }: ObjectTimelineProps) => {
  const { t } = useLingui();
  const { objectMetadataItems } = useObjectMetadataItems();

  const timelineActivityRules = useMemo(
    () =>
      getSettingsTimelineActivityRules({
        objectMetadataItem,
        objectMetadataItems,
      }),
    [objectMetadataItem, objectMetadataItems],
  );

  const objectLabelSingular = objectMetadataItem.labelSingular;

  return (
    <StyledContentContainer>
      <Section>
        <H2Title
          title={t`Record events`}
          description={t`Changes to a ${objectLabelSingular} logged on its own timeline. Consecutive updates by the same person are merged for a few minutes.`}
        />
        <Card rounded>
          <SettingsOptionCardContentToggle
            Icon={IconTimelineEvent}
            title={t`Log record changes`}
            description={t`Creation, updates, deletion and restoration write timeline entries.`}
            checked
            disabled
            onChange={() => {}}
          />
        </Card>
      </Section>
      {timelineActivityRules.length > 0 && (
        <Section>
          <H2Title
            title={t`Rules`}
            description={t`Events on related records that also appear on the ${objectLabelSingular} timeline, derived from your data model.`}
          />
          <SettingsObjectTimelineRulesTable
            timelineActivityRules={timelineActivityRules}
            objectMetadataItem={objectMetadataItem}
          />
        </Section>
      )}
    </StyledContentContainer>
  );
};
