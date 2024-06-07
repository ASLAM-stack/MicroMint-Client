import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const stepsW = [
  {
    label: 'Register',
    description: `Register with Micromint, the thriving freelance marketplace, and unlock a world of opportunities to showcase your skills and connect with clients globally. Earn 12 coins as a freelancer and 15 coins as a client upon signing up!`,
  },
  {
    label: 'Find and Apply task',
    description:
      'Micromint is a freelance marketplace where professionals can apply to tasks posted by clients, offering their expertise to complete projects ranging from design to programming. Freelancers submit proposals, showcasing their skills and bid amounts to secure the job.',
  },
  {
    label: 'Complete Task',
    description: `CompleteTask is a robust freelance marketplace by Micromint, connecting clients with skilled professionals for a wide range of project needs. It offers a seamless platform for hiring, project management, and secure payments.`,
  },
  {
    label: 'Earn Coins',
    description: `Earn Coins is a reward system in Micromint's freelance marketplace, allowing users to accumulate virtual currency through completed tasks and engagement, which can be redeemed for services or benefits within the platform..`,
  },
  {
    label: 'Withdraw Coins Convert to Money',
    description: `Withdraw your earned coins and convert them to real money effortlessly on Micromint, the freelance marketplace that makes cashing out your rewards simple and convenient.`,
  },
];

export const StepWorker =  () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Box  >
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepsW.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === stepsW.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepsW.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    </div>
  );
}
