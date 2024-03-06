import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import RadioListItem from '@components/SelectionList/RadioListItem';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@navigation/Navigation';
import type {SettingsNavigatorParamList} from '@navigation/types';
import type {WithPolicyAndFullscreenLoadingProps} from '@pages/workspace/withPolicyAndFullscreenLoading';
import withPolicyAndFullscreenLoading from '@pages/workspace/withPolicyAndFullscreenLoading';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';

type WorkspaceMemberDetailsPageProps = WithPolicyAndFullscreenLoadingProps & StackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.MEMBER_DETAILS_ROLE_SELECTION>;

function WorkspaceMemberDetailsRoleSelectionPage({policyMembers, route}: WorkspaceMemberDetailsPageProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const accountID = Number(route?.params?.accountID) ?? 0;
    const member = policyMembers?.[accountID];

    const items = [
        {
            value: CONST.POLICY.ROLE.ADMIN,
            text: translate('common.admin'),
            isSelected: member?.role === CONST.POLICY.ROLE.ADMIN,
            keyForList: CONST.POLICY.ROLE.ADMIN,
        },
        {
            value: CONST.POLICY.ROLE.USER,
            text: translate('common.member'),
            isSelected: member?.role === CONST.POLICY.ROLE.USER,
            keyForList: CONST.POLICY.ROLE.USER,
        },
    ];

    const changeRole = () => {};

    return (
        <ScreenWrapper testID={WorkspaceMemberDetailsRoleSelectionPage.displayName}>
            <FullPageNotFoundView>
                <HeaderWithBackButton
                    title={translate('common.role')}
                    onBackButtonPress={() => Navigation.goBack()}
                />
                <View style={[styles.containerWithSpaceBetween, styles.pointerEventsBoxNone]}>
                    <SelectionList
                        sections={[{data: items, indexOffset: 0}]}
                        ListItem={RadioListItem}
                        onSelectRow={changeRole}
                        initiallyFocusedOptionKey={items.find((item) => item.isSelected)?.keyForList}
                    />
                </View>
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

WorkspaceMemberDetailsRoleSelectionPage.displayName = 'WorkspaceMemberDetailsRoleSelectionPage';

export default withPolicyAndFullscreenLoading(WorkspaceMemberDetailsRoleSelectionPage);
