#import <Cordova/CDV.h>
#import <Jiopay-pg-uat/Jiopay-pg-uat-Swift.h>

@interface Main : CDVPlugin

@property NSString *callbackId;

- (void)open:(CDVInvokedUrlCommand *)command;

@end