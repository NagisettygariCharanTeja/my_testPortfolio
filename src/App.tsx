import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from './data/projects';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AppContainer = styled.div<{ isHovered: boolean }>`
  min-height: 100vh;
  width: 100%;
  background: ${props => props.isHovered 
    ? '#ffffff' 
    : 'linear-gradient(-45deg, #ffccd5, #e4c1f9, #a9def9, #d4f1f4)'};
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  position: relative;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 12rem;

  @media (max-width: 768px) {
    padding-top: 6rem;
    gap: 1rem;
  }
`;

const ProjectCard = styled(motion.div)`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 0.7;
  }
`;

const ProjectYear = styled.span`
  font-size: 0.9rem;
  color: #666;
  min-width: 45px;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 0.7;
  }
`;

const InfoSection = styled.div`
  padding-top: 12rem;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: normal;
  word-wrap: break-word;

  ${InfoSection}:has(+ .phone-preview) & {
    opacity: 0.2;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 0.25rem;
  }
`;

const Surname = styled.span``;

const Role = styled.p`
  font-size: 20px;
  color: #666;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: normal;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  transition: opacity 0.5s ease;

  ${InfoSection}:has(+ .phone-preview) & {
    opacity: 0.2;
  }
`;

const StyledSocialLink = styled.a`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const PhonePreview = styled(motion.div)`
  position: absolute;
  left: calc(250px + 1.5rem);
  top: 0;
  width: 300px;
  height: 600px;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 0;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 350px;
    height: 80vh;
    max-height: 700px;
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 1px solid #eee;
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Signal = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:after {
    content: '5G';
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

const SignalBars = styled.div`
  display: flex;
  gap: 1px;
  align-items: flex-end;
  height: 12px;
  
  span {
    width: 3px;
    background: white;
    border-radius: 1px;
    
    &:nth-child(1) { height: 5px; }
    &:nth-child(2) { height: 7px; }
    &:nth-child(3) { height: 9px; }
    &:nth-child(4) { height: 11px; }
  }
`;

const Battery = styled.div`
  width: 24px;
  height: 12px;
  border: 1.5px solid white;
  border-radius: 3px;
  padding: 1px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 6px;
    background: white;
    border-radius: 0 1px 1px 0;
  }
  
  div {
    height: 100%;
    width: 80%;
    background: #30d158;
    border-radius: 1px;
  }
`;

const HomeIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 135px;
  height: 5px;
  background: #000;
  border-radius: 100px;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:before {
    content: '←';
    font-size: 1.2rem;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserStatus = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const CallActions = styled.div`
  display: flex;
  gap: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: #000;
  }
`;

const PreviewContent = styled.div`
  height: calc(100% - 110px);
  overflow-y: auto;
  background: #fff;
  padding: 1rem;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const MessageBubble = styled.div`
  background: #f0f0f0;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  max-width: 80%;
  font-size: 0.9rem;
  color: #000;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
`;

const ReceivedMessage = styled(MessageBubble)`
  align-self: flex-start;
  border-bottom-left-radius: 4px;
`;

const SentMessage = styled(MessageBubble)`
  align-self: flex-end;
  background: #0084ff;
  color: white;
  border-bottom-right-radius: 4px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageMessage = styled.img`
  width: 80%;
  border-radius: 15px;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0.25rem 0;
  }
`;

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsHovered(!!selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = (project: Project) => {
    setSelectedProject(project);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AppContainer isHovered={isHovered}>
      <ContentWrapper>
        <ProjectList>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={() => setSelectedProject(null)}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProjectYear>{project.year}</ProjectYear>
              <ProjectTitle>{project.title}</ProjectTitle>
            </ProjectCard>
          ))}
        </ProjectList>
        <InfoSection>
          <Name>Charan Teja <Surname>Nagisettygari</Surname></Name>
          <Role>AI Engineer and Data Scientist</Role>
          <SocialLinks>
            <StyledSocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </StyledSocialLink>
            <StyledSocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </StyledSocialLink>
          </SocialLinks>
        </InfoSection>

        <AnimatePresence>
          {selectedProject && (
            <PhonePreview
              className="phone-preview"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.5,
                duration: 0.6
              }}
              style={{
                transform: window.innerWidth <= 768 ? 'translate(-50%, -50%)' : 'none'
              }}
            >
              <StatusBar>
                <StatusLeft>
                  <span>{formatTime(currentTime)}</span>
                </StatusLeft>
                <StatusRight>
                  <Signal>
                    <SignalBars>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </SignalBars>
                  </Signal>
                  <Battery><div /></Battery>
                </StatusRight>
              </StatusBar>
              <PreviewHeader>
                <BackButton />
                <UserAvatar />
                <UserInfo>
                  <UserName>Charan Teja</UserName>
                  <UserStatus>Active now</UserStatus>
                </UserInfo>
                <CallActions>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </CallActions>
              </PreviewHeader>
              <PreviewContent>
                <MessageContainer>
                  <ReceivedMessage>
                    Hey! Check out my latest project: {selectedProject.title}
                  </ReceivedMessage>
                  <ImageMessage 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                  />
                  <ReceivedMessage>
                    {selectedProject.description}
                  </ReceivedMessage>
                  <SentMessage>
                    That's amazing! When did you complete this?
                  </SentMessage>
                  <ReceivedMessage>
                    I finished it in {selectedProject.year}. It was a great experience working on this.
                  </ReceivedMessage>
                  {selectedProject.company && (
                    <ReceivedMessage>
                      I worked on this at {selectedProject.company}
                    </ReceivedMessage>
                  )}
                  {selectedProject.collaborator && (
                    <ReceivedMessage>
                      I collaborated with {selectedProject.collaborator} on this project
                    </ReceivedMessage>
                  )}
                </MessageContainer>
              </PreviewContent>
              <HomeIndicator />
            </PhonePreview>
          )}
        </AnimatePresence>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
