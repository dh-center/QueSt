package ru.dhcenter.quest;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;

public class SplashActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    finish();
  }
}
