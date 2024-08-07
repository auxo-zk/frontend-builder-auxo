import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Container, TextField, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });
import { projectInitData, useCreateProjectData, useCreateProjectFunctions } from './state';
import TeamMember from './TeamMembers';
import AdditionalDoc from './AdditionalDoc';
import { useEffect, useState } from 'react';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { useRouter } from 'next/router';
import BannerInput from './BannerInput';
import { imagePath } from 'src/constants/imagePath';
import Link from 'next/link';
import Avatar from 'src/components/Avatar/Avatar';
import { toast } from 'react-toastify';
import { useProfileData } from 'src/views/profile/state';

export default function CreateProject() {
    const { overViewDescription, challengeAndRisk, problemStatement, solution, name, publicKey, avatarImage, coverImage, members } = useCreateProjectData();
    const { setProjectData, handleSaveDraftProject, handleSubmitProject } = useCreateProjectFunctions();
    const [loading, setLoading] = useState<boolean>(false);
    const [submiting, setSubmiting] = useState<boolean>(false);
    const router = useRouter();
    const userProfile = useProfileData();

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            await handleSaveDraftProject(String(router.query.id || ''));
            router.push('/profile');
        } catch (error) {
            console.log(error);
            toast((error as Error).message, { type: 'error' });
        }
        setLoading(false);
    };

    const handleSubmitClick = async () => {
        setSubmiting(true);
        await handleSubmitProject();
        setSubmiting(false);
    };

    useEffect(() => {
        if ((router.pathname = '/explorer/projects/create')) {
            setProjectData({
                ...projectInitData,
                members: [{ profileName: userProfile?.name || '', role: userProfile?.role || 'Owner', publicKey: userProfile?.address || '', socialLink: userProfile?.website || '' }],
            });
        }
    }, []);

    return (
        <Container
            sx={(theme) => ({
                pb: 5,
                '& .timeline-row': {
                    display: 'flex',
                    alignItems: 'center',
                    my: 4,
                },
                '& .timeline-dot': { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'background.primary', border: '2px solid ' + theme.palette.primary.light, mr: 1.5 },
            })}
        >
            <Box sx={{ position: 'relative', mb: 9 }}>
                <BannerInput img={coverImage || imagePath.DEFAULT_BANNER.src} />
                <Box sx={{ position: 'absolute', left: '20px', bottom: '-50px', borderRadius: '50%', border: '4px solid #FFFFFF' }}>
                    <Avatar
                        src={avatarImage || imagePath.DEFAULT_AVATAR.src}
                        size={100}
                        onChange={(files) => {
                            const file = files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setProjectData({ avatarImage: reader.result as string, avatarFile: file });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </Box>
            </Box>
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/profile" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>Builder Profile</Typography>
                    </Box>
                </Link>
                <Typography color={'primary.main'} fontWeight={600}>
                    {"Project's Information Editor"}
                </Typography>
            </Breadcrumbs>
            <Typography variant="h1">{"Project's Information Editor"}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
                <TextField
                    fullWidth
                    label="Project's name"
                    type="text"
                    name="project_name"
                    sx={{ mr: 3 }}
                    value={name}
                    onChange={(e) => {
                        setProjectData({ name: e.target.value });
                    }}
                />
                <TextField
                    fullWidth
                    label="Public key"
                    type="text"
                    name="project_name"
                    sx={{ ml: 3 }}
                    value={publicKey}
                    onChange={(e) => {
                        setProjectData({ publicKey: e.target.value });
                    }}
                />
            </Box>
            <Typography variant="h6" mt={6} mb={1}>
                Overview description
            </Typography>
            <TextField
                fullWidth
                type="text"
                name="overview_desc"
                placeholder="Description of your project"
                value={overViewDescription}
                onChange={(e) => {
                    setProjectData({ overViewDescription: e.target.value });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Problem Statement*
            </Typography>
            <CustomEditor
                value={problemStatement}
                onChange={(v: string) => {
                    setProjectData({ problemStatement: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Solution*
            </Typography>
            <CustomEditor
                value={solution}
                onChange={(v: string) => {
                    setProjectData({ solution: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Challenges & Risks*
            </Typography>
            <CustomEditor
                value={challengeAndRisk}
                onChange={(v: string) => {
                    setProjectData({ challengeAndRisk: v });
                }}
            />
            {/* <ApplicationForm /> */}
            <Box sx={{ mt: 5 }}>
                <TeamMember />
            </Box>
            <Box sx={{ mt: 5 }}>
                <AdditionalDoc />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ButtonLoading muiProps={{ variant: 'contained', onClick: handleSaveClick, sx: { mr: 1 } }} isLoading={loading}>
                    Save
                </ButtonLoading>
                <ButtonLoading isLoading={submiting} muiProps={{ variant: 'contained', onClick: handleSubmitClick }}>
                    Submit
                </ButtonLoading>
            </Box>
        </Container>
    );
}
