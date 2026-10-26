// About Department page - intro, vision, mission, objectives, focus areas.
import { Container, Typography, Card, CardContent, Chip, Box } from "@mui/material";
import PageHeader from "../components/PageHeader";

export default function About() {
  const objectives = [
    "Deliver quality education in computer science and engineering",
    "Encourage practical learning through labs, projects and workshops",
    "Develop problem solving, communication and teamwork skills",
    "Prepare students for higher studies, research and placements",
    "Promote ethics, lifelong learning and industry collaboration",
  ];

  const focusAreas = [
    "Full-Stack Web Development",
    "Data Structures and Algorithms",
    "Artificial Intelligence and Machine Learning",
    "Cloud and Distributed Computing",
    "Cyber Security",
    "Internet of Things",
  ];

  return (
    <>
      <PageHeader
        title="About the Department"
        subtitle="Introduction, vision, mission and key focus areas of the Computer Science and Engineering department."
      />

      <Container maxWidth="lg" className="section">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              The Department of Computer Science and Engineering at D. Y. Patil College of
              Engineering and Technology, Kolhapur, prepares students for a career in computing
              through a balanced mix of theory, laboratory work and project based learning. The
              department offers a four year B.E. programme divided into First, Second, Third and
              Fourth Year (FE, SE, TE, BE).
            </Typography>
            <Chip
              size="small"
              color="warning"
              variant="outlined"
              label="Sample content - replace with verified official text when available"
            />
          </CardContent>
        </Card>

        <div className="grid-2">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Vision
              </Typography>
              <Typography variant="body1">
                To produce competent computer engineers who can solve real world problems with
                technology, innovation and strong ethical values.
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Mission
              </Typography>
              <Typography variant="body1" component="div">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Provide strong fundamentals in computing and mathematics</li>
                  <li>Promote industry oriented projects and practical skills</li>
                  <li>Encourage research, innovation and lifelong learning</li>
                  <li>Develop professional and ethical attitude in students</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="grid-2">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Department Objectives
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {objectives.map((o) => (
                  <li key={o}>
                    <Typography variant="body2">{o}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Focus Areas
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {focusAreas.map((f) => (
                  <Chip key={f} label={f} color="primary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
