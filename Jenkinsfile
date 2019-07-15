pipeline {
    agent any
    tools {nodejs "NodeJSAuto"}
    stages {
        stage('Build') {
            steps {
              // TODO maybe "npm install" for code analysis to scan dependencies
              echo 'Build'
              sh 'npm install'
              sh 'npm build'
              sh 'npm pack'
            }
        }
        stage('Test') {
            steps {
              // TODO selenium tests
              echo 'Test'
            }
        }
        stage('Code Analysis') {
            
            steps {
              // TODO
                echo 'Code Analysis'
                nodejs(nodeJSInstallationName: 'NodeJSAuto', configId: '') {
                  script {
                    withSonarQubeEnv('bdso-ocp-sonarqube') {
                        def scannerHome = tool 'jenkins-sonarqube-install';
                        sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.host.url=https://sonarqube.apps.bdso.knightpoint.systems \
                        -Dsonar.login=c85eb6c7e2208a03357397726c0d3e89b05259f1 -Dsonar.projectKey='frontend' -Dsonar.sources='src'"
                   }
                }
              }
            }
        }
        stage('Upload artifact') {
            steps {
                // TODO is there an artifact?
                // Maybe zip the source files
                //react-api-client-0.1.0.tgz
                echo 'Upload artifact'
                nexusArtifactUploader(
                nexusVersion: 'nexus3',
                protocol: 'https',
                nexusUrl: 'nexus.apps.bdso.knightpoint.systems',
                groupId: 'demo-app',
                version: '0.1.0',
                repository: 'bdso',
                credentialsId: '73df99b1-dafc-43c2-8968-d9b5c76eb7d3',
                  artifacts: [
                    [artifactId: 'demo-frontend',
                     classifier: '',
                    //  file: 'demo-app' + '0.0.1' + '.war',
                     file: 'demo-frontend-0.1.0.tgz',
                     type: 'tgz']
                  ]
                )
            }
        }
        stage('Deploy - Openshift') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject('demo-app-dev') {
                            openshift.selector('buildConfig', 'demo-app-frontend').startBuild( "--wait=true")
                        }
                    }
                }
            }
        }
    }
}
