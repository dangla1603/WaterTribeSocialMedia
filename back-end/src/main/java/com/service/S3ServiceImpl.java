package com.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;

import java.io.File;

@Service("S3-service")
public class S3ServiceImpl implements S3Service{
    private String awsID= System.getenv("AWS_ID");
    private String awsKey= System.getenv("AWS_Key");
    private String bucket= "revaturesmp";

    BasicAWSCredentials awsCredentials= new BasicAWSCredentials(awsID, awsKey);
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.DEFAULT_REGION)
            .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();


    /**
     * add image to aws s3
     * @param file image file
     */
    @Override
    public void addImage(File file){
        //TODO: change this to log
        System.out.format("Uploading %s to S3 bucket %s...\n", file.getName(), "revaturesmp");
        try{
            s3.putObject(bucket, "users/"+file.getName(), file);
        }catch(AmazonServiceException e){
            System.out.println(e.getErrorMessage());
        }
    }
}
