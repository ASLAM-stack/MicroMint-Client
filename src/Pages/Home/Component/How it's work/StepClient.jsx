import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
    {
      label: 'Register',
      description: `Register with Micromint, the thriving freelance marketplace, and unlock a world of opportunities to showcase your skills and connect with clients globally. Earn 12 coins as a freelancer and 15 coins as a client upon signing up!`,
    },
    {
      label: 'Purchase Coins',
      description:
        'Purchase coins on Micromint to unlock premium features and enhance your experience on our freelance marketplace. Use these coins to bid on projects, promote your profile, and access exclusive resources.',
    },
    {
      label: 'Create Task',
      description: `Develop a robust and user-friendly freelance marketplace for Micromint, facilitating seamless connections between freelancers and clients, featuring project listings, secure payment integration, and a rating system.`,
    },
    {
      label: 'Select Freelancer and Approve For Work',
      description: ` Review and choose from a pool of skilled freelancers based on their profiles, portfolios, and client reviews. 

 Confirm and authorize the selected freelancer to begin the project, ensuring they meet your requirements and expectations.`,
    },
    {
      label: 'Payment',
      description: ` After Complete Task Pay The Freelancer ensures that freelancers receive payment promptly upon the successful completion of their tasks, fostering trust and reliability within the Micromint freelance marketplace.`,
    },
  ];

const StepClient = () => {
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
             <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
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
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
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
      {activeStep === steps.length && (
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
};

export default StepClient;