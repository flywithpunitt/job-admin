import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, TextField, Typography, Autocomplete } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';

import { PATH_DASHBOARD } from 'src/routes/paths';
import ReactQuill from 'react-quill';
import { useCreateBlogMutation } from 'src/services';
import 'react-quill/dist/quill.snow.css';
// routes
// components

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  "JobSearch", "JobOpening", "Hiring", "JobHunt", "JobOpportunity", "CareerAdvice", "ResumeTips", "InterviewPrep", "JobInterview", "JobApplication", "JobSeeker", "JobAlert", "JobPosting", "Employment", "NowHiring", "JobSeeking", "JobTips", "JobSeekers", "JobInterviewTips", "JobFair", "JobMarket", "WorkOpportunity", "CareerGrowth", "WorkplaceTips", "RemoteJobs", "FreelanceWork", "JobSearchStrategies", "CareerDevelopment", "ProfessionalNetwork", "JobSeekerTips"
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export type FormValuesProps = {

  title: string;
  description: string;
  tags: string[];
  publish: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  image: any;

};

export default function BlogNewPostForm() {

  const [CreateBlog, { isError, isLoading }] = useCreateBlogMutation()



  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editorData, setEditorData] = useState('');
  const { enqueueSnackbar } = useSnackbar();



  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(40, 'Title must be less then 40 characters'),
    description: Yup.string().required('Title is required')
      .max(225, 'description must be less then 40 characters').min(10, 'Description must be maximum 10 characters '),
    metaTitle: Yup.string().required('Meta Title Required')
      .max(225, 'Meta Title must be less then 40 characters').min(10, 'Meta Title must be maximum 10 characters '),
    metaDescription: Yup.string().required('Meta Description is required').max(225, 'Meta Description must be less then 40 characters').min(10, 'Meta Description must be maximum 10 characters '),
  });
  const defaultValues = {
    title: '',
    description: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],

  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = methods;


  const onSubmit = async (data: FormValuesProps) => {

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('content', editorData);
      formData.append('tags', data.tags.join(','));
      formData.append('metaTitle', data.metaTitle);
      formData.append('metaDescription', data.metaDescription);
      formData.append('metaKeyword', data.tags.join(','));
      formData.append('cover', getValues('image'));
      formData.append('status', 'draft');

      await CreateBlog(formData).unwrap();
      reset();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.blog.list)
    } catch (error) {
      console.log(error)
      if (error.data) {
        Object.entries(error.data).forEach(([field, errorMessage]) => {
          enqueueSnackbar(`Error in ${field}: ${errorMessage}`, { variant: 'error' });
        });
      } else {
        enqueueSnackbar('error please check console', { variant: 'error' });
      }

    }
  };
  const OnchangeHandle = (e: any) => {
    setEditorData(e)
  }


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <div>

                  <Stack sx={{ height: 300 }}>
                    <ReactQuill theme="snow" value={editorData} onChange={OnchangeHandle}
                      style={{ height: 260 }} />
                  </Stack>
                </div>

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div> */}
                <input type="file" name='image' onChange={(e) => {
                  //@ts-ignore
                  setValue('image', e.target?.files?.[0])
                }} accept="image/png, image/gif, image/jpeg" />

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />

                <RHFTextField name="metaTitle" label="Meta title" />
                <div>
                  <RHFTextField name='metaDescription' label="Meta description" multiline rows={3} />
                </div>
                <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isLoading}
              >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
