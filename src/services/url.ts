import { Constants } from '@auxo-dev/platform';
import { BACKEND_BASE_URL } from './baseUrl';

export const apiUrl = {
    saveFile: `${BACKEND_BASE_URL}/v0/object-storage`,
    listCommittee: `${BACKEND_BASE_URL}/v0/committee`,
    createCommittee: `${BACKEND_BASE_URL}/v0/committee`,
    //signature
    serverSigNature: `${BACKEND_BASE_URL}/v0/auth`,
    getTokenFromSig: `${BACKEND_BASE_URL}/v0/auth`,
    //Project
    getTopProject: `${BACKEND_BASE_URL}/v0/projects`,
    getListProject: `${BACKEND_BASE_URL}/v0/projects`,
    getParticipationsByProjectId: (projectId: string) => `${BACKEND_BASE_URL}/v0/projects/${projectId}/participations`,

    saveProject: `${BACKEND_BASE_URL}/v0/builders`,
    createProject: `${BACKEND_BASE_URL}/v0/builders`,
    getDraft: `${BACKEND_BASE_URL}/v0/builders/drafts`,
    getDraftDetail: (id: string) => `${BACKEND_BASE_URL}/v0/builders/drafts/${id}`,
    getProject: `${BACKEND_BASE_URL}/v0/projects`,
    postProjectToIpfs: `${BACKEND_BASE_URL}/v0/projects`,
    //project detail
    projectDetail: `${BACKEND_BASE_URL}/v0/projects`,
    //campaign
    getCampaign: `${BACKEND_BASE_URL}/v0/campaigns`,
    getCampaignAll: `${BACKEND_BASE_URL}/v0/campaigns/all`,
    campaignDetail: `${BACKEND_BASE_URL}/v0/campaigns`,
    getProjectNotParticipateCampaign: (campaignId: string, address: string) => `${BACKEND_BASE_URL}/v0/campaigns/${campaignId}/projects/not-participated?projectOwner=${address}`,
    getParticipatingProjects: (campaignId: string) => `${BACKEND_BASE_URL}/v0/campaigns/${campaignId}/projects`,
    //profile
    getUserProfile: `${BACKEND_BASE_URL}/v0/builders`,
    editProfile: `${BACKEND_BASE_URL}/v0/builders`,
    editProfileImage: `${BACKEND_BASE_URL}/v0/builders/update-avatar`,
    checkJwt: `${BACKEND_BASE_URL}/v0/auth/profile`,
    getProjectMemberWitness: (projectId: string, memberId: string) => `${BACKEND_BASE_URL}/v0/storages/project/members/witness/${projectId}-${memberId}`,
    getParticipationZkappWitness: `${BACKEND_BASE_URL}/v0/storages/participation/zkApps/witness/${Constants.ZkAppIndex.PROJECT}`,
    getProjectMemLvl1: `${BACKEND_BASE_URL}/v0/storages/project/member/level1`,
    getProjectMemLvl2: (projectId: string) => `${BACKEND_BASE_URL}/v0/storages/project/member/level2/${projectId}`,
    getParticipationZkApp: `${BACKEND_BASE_URL}/v0/storages/participation/zkapps`,
    postProjectParticipation: (projectId: string) => `${BACKEND_BASE_URL}/v0/projects/${projectId}/participations`,
    getWitnessIndex: `${BACKEND_BASE_URL}/v0/storages/participation/index/level1`,

    getDataParticipateCampaign: (campaignId: string, projectId: string) =>
        `${BACKEND_BASE_URL}/v0/method-inputs/participation-contract/participate-campaign?campaignId=${campaignId}&projectId=${projectId}`,

    getDataClaimFund: (campaignId: string, projectId: string) => `${BACKEND_BASE_URL}/v0/method-inputs/treasury-manager-contract/claim-fund?campaignId=${campaignId}&projectId=${projectId}`,
};
